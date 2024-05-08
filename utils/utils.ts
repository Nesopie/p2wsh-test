export const strip0x = (str: string) => {
    return str.startsWith("0x") ? str.slice(2) : str;
};
