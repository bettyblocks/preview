export type Category = DefaultCategory | string;

export interface Component {
  name: string;
  type: string;
  allowedTypes: string[];
  orientation: Orientation;
  jsx: string;
  styles: string;
}

export interface ComponentContextProps {
  components: Record<string, Component> | null;
}

export interface ComponentReference {
  name: string;
  options: Option[];
  descendants: ComponentReference[];
}

export type DefaultCategory =
  | 'CONTENT'
  | 'DATA'
  | 'FORM'
  | 'LAYOUT'
  | 'NAVIGATION'
  | 'TABLE';

export type Icon =
  | 'AccordionIcon'
  | 'AccordionItemIcon'
  | 'AlertIcon'
  | 'AutoCompleteIcon'
  | 'BreadcrumbIcon'
  | 'BreadcrumbItemIcon'
  | 'ButtonGroupIcon'
  | 'ButtonIcon'
  | 'CheckboxIcon'
  | 'Column2Icon'
  | 'Column3Icon'
  | 'ColumnIcon'
  | 'ContainerIcon'
  | 'DataContainer'
  | 'DataTable'
  | 'DataTableBody'
  | 'DataTableColumn'
  | 'DataTableHead'
  | 'DataTableRow'
  | 'DatePickerIcon'
  | 'DateTimePickerIcon'
  | 'DefinitionListIcon'
  | 'DynamicFormIcon'
  | 'DynamicTableIcon'
  | 'DynamicTilesIcon'
  | 'EmailInputIcon'
  | 'FileInputIcon'
  | 'FormIcon'
  | 'GridIcon'
  | 'HiddenInputIcon'
  | 'HorizontalRuleIcon'
  | 'HtmlIcon'
  | 'IbanInputIcon'
  | 'IconIcon'
  | 'ImageIcon'
  | 'ImageInputIcon'
  | 'IncludeIcon'
  | 'LabelIcon'
  | 'Layout1Icon'
  | 'Layout2Icon'
  | 'Layout3333Icon'
  | 'Layout363Icon'
  | 'Layout444Icon'
  | 'Layout48Icon'
  | 'Layout66Icon'
  | 'Layout84Icon'
  | 'ListItemIcon'
  | 'MultiLineIcon'
  | 'MultiSelectIcon'
  | 'NavbarIcon'
  | 'NavItemIcon'
  | 'NavSidebarIcon'
  | 'NumberInputIcon'
  | 'OrderedListIcon'
  | 'PanelIcon'
  | 'ParagraphIcon'
  | 'PasswordInputIcon'
  | 'PhoneInputIcon'
  | 'PriceInputIcon'
  | 'ProgressBarIcon'
  | 'RadioButtonIcon'
  | 'RowColumnIcon'
  | 'RowIcon'
  | 'SelectIcon'
  | 'SubmitButtonIcon'
  | 'TabGroupIcon'
  | 'Table'
  | 'TextInputIcon'
  | 'TextareaIcon'
  | 'TimePickerIcon'
  | 'TitleIcon'
  | 'UnorderedListIcon'
  | 'UrlInputIcon';

export interface Option {
  value: unknown;
  label: string;
  key: string;
  type: string;
  configuration?: unknown;
}

export type OptionMap = Record<string, unknown>;

export type Orientation = 'VERTICAL' | 'HORIZONTAL';

export interface Prefab {
  name: string;
  icon: Icon;
  category: Category;
  structure: ComponentReference[];
}
