"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/client/card-wrapper";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-components/form-error";
import { FormSuccess } from "@/components/form-components/form-success";
import { newVerification } from "@/action/new-verification";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token manquant !");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        return;
      })
      .catch(() => {
        setError("Quelque chose s'est mal passé !");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="">
      <p className="text-sm text-muted-foreground text-center max-w-xs mx-auto mb-4">
        Confirmation de votre email.
      </p>
      <div className="w-full flex justify-center items-center">
        {!success && !error && (
          <BeatLoader
            color="green"
            size={20}
          />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
