export const nextId = (() => { let i = 1; return (p = "n") => `${p}-${i++}`; })();
