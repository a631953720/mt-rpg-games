export interface PersistAble<NameBinding = any> {
  toNameBinding(): NameBinding;
}
