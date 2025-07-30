import React from 'react';

import type * as AntdType from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { TextAreaProps } from 'antd/es/input';
import { PatternFormatProps } from 'react-number-format';
import { OTPInputProps } from 'react-otp-input';

// Generic interface for shared properties
interface IBaseInputProps<InputPropsType> {
  colProps?: AntdType.ColProps;
  formItemProps?: AntdType.FormItemProps;
  inputProps?: InputPropsType & { addonAfterText?: string };
  colClassName?: string;
  label?: string;
  required?: boolean;
  tooltip?: string;
}

// Interfaces using the base interface
// Types
export type IRenderTextInputProps = IBaseInputProps<AntdType.InputProps>;
export type IRenderPasswordInputProps = IBaseInputProps<AntdType.InputProps>;
export type IRenderNumberInputProps = IBaseInputProps<AntdType.InputNumberProps>;
export type IRenderTextAreaInputProps = IBaseInputProps<TextAreaProps>;
export type IRenderSelectProps = IBaseInputProps<AntdType.SelectProps>;
export type IRenderSearchInputProps = IBaseInputProps<AntdType.InputProps>;
export type IRenderDatePickerInputProps = IBaseInputProps<AntdType.DatePickerProps>;
export type IRenderRadioGroupInputProps = IBaseInputProps<AntdType.RadioGroupProps>;
export type IRenderRadioInputProps = IBaseInputProps<AntdType.RadioProps>;

// Interface
export interface IRenderCheckboxGroupInputProps<T = any>
  extends IBaseInputProps<CheckboxGroupProps<T>> {
  options?: Array<CheckboxOptionType<T>>;
  checkboxName?: string;
}

export interface IRenderCheckboxInputProps extends IBaseInputProps<AntdType.CheckboxProps> {
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export interface IRenderUploadInputProps extends IBaseInputProps<AntdType.UploadProps> {
  uploadIcon?: React.ReactNode;
  isUploading?: boolean;
  uploadText?: string;
  imageLoading?: boolean;
}

export interface RenderProfileUploadInputProps extends IBaseInputProps<AntdType.UploadProps> {
  uploadIcon?: React.ReactNode;
  isUploading?: boolean;
  placeholderUrl?: string;
  imageLoading?: boolean;
}

export interface IRenderOtpInputProps
  extends Omit<OTPInputProps, 'renderSeparator' | 'renderInput'> {
  colProps?: AntdType.ColProps;
  colClassName?: string;
  renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
  renderInput?: (inputProps: AntdType.InputProps, index: number) => React.ReactNode;
  disabled?: boolean;
}

export interface IRenderPatternFormatInputProps
  extends IBaseInputProps<Omit<PatternFormatProps<AntdType.InputProps>, 'format'>> {
  format?: PatternFormatProps['format'];
}

export interface IRenderGoogleAutocompleteProps {
  colProps?: AntdType.ColProps;
  formItemProps?: AntdType.FormItemProps;
  inputProps?: AntdType.InputProps;
  googleAutocompleteProps: {
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    options?: google.maps.places.AutocompleteOptions;
  };
  colClassName?: string;
  required?: boolean;
}
