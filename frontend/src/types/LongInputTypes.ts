export interface TextInputLongTypes {
    content: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    maxLength?: number;
}
