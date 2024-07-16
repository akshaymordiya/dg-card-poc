"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Input from "@/app/component/Input";
import Grid from "@/app/component/Grid";
import SectionTitle from "@/app/component/SectionTitle";
import { validationSchema } from "@/app/component/Scheme";

const defaultErrorState = {
  name: "",
  company: "",
  email: "",
  comment: "",
};

const Contact = ({ data = {} }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messages, setMessages] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const [isProcessing, setIsProcessing] = useState(false);
  

  const clearForm = () => {
    setName("");
    setPhone("");
    setMessages("");
  };

  const handleChange = (key, value) => {
    const updateFuncs = {
      name: setName,
      phone: setPhone,
      messages: setMessages,
    };

    updateFuncs[key](value);
  };

  const validateFeilds = async (key = undefined) => {
    const stateKeys = {
      name: name, // Assuming 'name' is your state variable for the name field
      phone: phone, // Same for phone and messages
      messages: messages,
    };
  
    try {
      if (key) {
        await validationSchema.validateAt(key, {
          [key]: stateKeys[key],
        });
      } else {
        await validationSchema.validate(
          {
            name,
            phone,
            messages,
          },
          { abortEarly: false }
        );
      }
  
      setErrors((prev) =>
        key ? { ...prev, [key]: "" } : defaultErrorState
      );
      return true;
    } catch (err) {
      const errors = [];
      if (key) {
        errors.push(err);
      } else {
        errors.push(...err.inner);
      }
  
      const validationErrors = {};
      errors.forEach((error) => {
        validationErrors[error.path] = getCustomErrorMessage(error.message); // Replace with your error message logic
      });
  
      setErrors(() => ({
        ...defaultErrorState,
        ...validationErrors,
      }));
      return false;
    }
  };
  
  function getCustomErrorMessage(message) {
    switch (message) {
      case "Name is required":
        return "Please enter your name.";
      case "Phone is required":
        return "Please enter your phone number.";
      // Add more cases for other validation errors
      default:
        return message; // Fallback to default message
    }
  }

  const handleSubmit = async (e) => {
    if (isProcessing) return;

    e.preventDefault();
    const isValidData = await validateFeilds();
    if (!isValidData) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/contact/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          messages,
        }),
      });

      const result = await response.json();

      if (response.ok && result?.success) {
        return "Thanks for reaching out, Your response has been submitted!";
      }
      clearForm("");
    } catch (error) {
      setErrors("Something Went Wrong");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.contact_from_container}>
    <div className={styles.contact_from_container_wrapper} onKeyDown={handleKeyDown}>
        <SectionTitle title="Share your thoughts with us" itemclass={styles.title} />
      <Grid classNames={styles.contact_from_container_wrapper_box}>
        <Grid.Item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => validateFeilds("name")}
            placeholder="Your good name"
            type="text"
            error={errors.name}
          />
        </Grid.Item>
        <Grid.Item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Input
            id="phone"
            required
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => validateFeilds("phone")}
            placeholder="Your Phone number (with country code)"
            type="text"
            error={errors.email}
          />
        </Grid.Item>
        <Grid.Item xs={12} sm={12} md={12} lg={12} xlg={12}>
          <Input
            id="messages"
            textarea
            value={messages}
            onChange={(e) => handleChange("messages", e.target.value)}
            onBlur={() => validateFeilds("messages")}
            placeholder="Your Message ( max 300 char )"
            type="text"
            required
            error={errors.comment}
          />
        </Grid.Item>
      </Grid>
      <button
          type="submit"
          className={styles.contact_from_container_wrapper_box_submit_btn}
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div>Processing...</div>
          ) : (
            <span className={styles.text}>Submit Your Query</span>
          )}
        </button>
      </div>
      </div>
  );
};

Contact.displayName = "Contact";

export default Contact;
