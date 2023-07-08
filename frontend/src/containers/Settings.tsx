import React, { useState } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "../lib/errorLib";
import config from "../config";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BillingForm from "../components/BillingForm";
import "./Settings.css";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";

interface Token {
  id: string;
}

interface UserDetails {
  storage: string;
  source: string;
}

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(config.STRIPE_KEY) as Promise<Stripe | null>;

  function billUser(details: UserDetails) {
    return API.post("notes", "/billing", {
      body: details,
    });
  }

  async function handleFormSubmit(
    storage: string,
    { token, error }: { token: Token | null; error: any }
  ) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token!.id,
      });

      alert("Your card has been charged successfully!");
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton size="lg">
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton size="lg">
          Change Password
        </LoaderButton>
      </LinkContainer>
      <hr />
      <Elements stripe={stripePromise}>
        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
      </Elements>
    </div>
  );
}
