import {IDiscussion} from './IDiscussion';
export class Discussion implements IDiscussion {
  constructor(
    public Id?: string,
    public DiscussionQuestion?: string
  ){}
}
