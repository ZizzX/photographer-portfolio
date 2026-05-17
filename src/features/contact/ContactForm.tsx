"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { sendGAEvent } from "@next/third-parties/google";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!form.email || !EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Введите корректный email-адрес";
    }

    if (!form.message || form.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Имитация отправки
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setForm({ name: "", email: "", message: "" });

    // Analytics event tracking
    sendGAEvent({ event: "generate_lead", value: "contact_form" });
    if (typeof window !== "undefined" && "ym" in window) {
      const ymId = process.env.NEXT_PUBLIC_YM_ID;
      if (ymId) {
        (
          window as unknown as {
            ym: (id: string, action: string, target: string) => void;
          }
        ).ym(ymId, "reachGoal", "submit_form");
      }
    }

    // Возврат в начальное состояние через 5 секунд
    setTimeout(() => setIsSuccess(false), 5000);
  };

  if (isSuccess) {
    return (
      <div
        className="w-full max-w-md mx-auto p-6 bg-[#18181B] rounded-lg border border-[#27272A] text-center"
        data-testid="contact-success"
      >
        <h3 className="text-xl font-playfair text-[#E5B05C] mb-2">Спасибо!</h3>
        <p className="text-zinc-400">
          Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md mx-auto space-y-6"
      data-testid="contact-form"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Имя
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
          data-testid="input-name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
          data-testid="input-email"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Сообщение
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Опишите ваш проект..."
          value={form.message}
          onChange={handleChange}
          error={errors.message}
          disabled={isSubmitting}
          className="min-h-[120px]"
          data-testid="input-message"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        data-testid="submit-btn"
      >
        Отправить сообщение
      </Button>
    </form>
  );
}
