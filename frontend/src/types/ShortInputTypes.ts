export interface TextInputShortTypes {
    placeholder?: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    content: string;
    onChange: (value: string) => void;
}
