export interface TreeSelectInterface {
  value: string; //or number
  label: string;
  checked: boolean;
  expanded: boolean, // add esse item por causa do item 3
  children: TreeSelectInterface[];
}
