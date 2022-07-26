export type Sticky = {
    isPublic: boolean;
    category: string;
    createdDate: Date;
    title: string;
    body: string;
}

export type Comic = {
    name: string;
    howRead: string;
    describe: JSX.Element;
}