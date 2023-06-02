import { useEffect, useState } from "react";

export function emailValidator(input: string): string {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(input) ? "" : "form.error.invalidEmail";
}
export function phoneValidator(input: string): string {
    const regex = /^[0-9]{9}$/;
    return regex.test(input) ? "" : "form.error.invalidPhone";
}
export function notEmptyValidator(input: string): string {
    return input && input.length >= 1 ? "" : "form.error.notEmpty";
}
export function haveNumbersValidator(input: string): string {
    return /(?=.*\d).*/.test(input) ? "" : "form.error.noNumbers";
}
export function minLength8Validator(input: string): string {
    return input.length >= 8 ? "" : "form.error.minLength8";
}
export function authCodeValidator(value: string): string {
    return /^[0-9]{6}$/.test(value) ? "" : "form.error.invalidAuthCode";
}

export function upperLowerCaseValidator(input: string): string {
    return /(?=.*[A-Z])(?=.*[a-z]).*/.test(input)
        ? ""
        : "form.error.upperLowerCase";
}

export const useValidator = (
    input: string,
    validators: { (input: string): string }[]
): [boolean, boolean, string, { (): boolean }] => {
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (!dirty && input) {
            setDirty(true);
        }
        for (const validator of validators) {
            const e = validator(input);
            if (e) {
                setError(true);
                setMessage(e);
                return;
            }
        }
        setError(false);
        setMessage("");
    }, [input]);

    const validate = () => {
        for (const validator of validators) {
            const e = validator(input);
            if (e) {
                setDirty(true);
                setError(true);
                setMessage(e);
                return false;
            }
        }
        return true;
    };
    return [dirty, error, message, validate];
};