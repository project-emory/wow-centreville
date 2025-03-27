export interface SearchBarTypes {
    placeholder?: string;
    className?: string;
    width?: string;
    height?: string;
    onSearch: (query: string) => void; // The function that will handle the search logic
}
