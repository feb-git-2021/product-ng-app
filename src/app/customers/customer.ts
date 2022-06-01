export class Customer {

    constructor(
        public firstName='',
        public lastName='',
        public email='',
        public sendCatalog=false,
        public address1?:string,
        public address2?:string,
        public city?:string,
        public state:string=''

    )
    {}
}
