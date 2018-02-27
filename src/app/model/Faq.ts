import {IFaq} from './IFaq';

export class Faq implements IFaq {

  constructor(
    public Id?: string,
    public Question?: string,
    public Answer?: string,
    public Open?: boolean
  ) { }
}
