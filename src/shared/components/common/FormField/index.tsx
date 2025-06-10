import React from 'react';

import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd';
import { PatternFormat } from 'react-number-format';
import OtpInput from 'react-otp-input';

import * as PropType from './types';

export const RenderTextInput: React.FC<PropType.IRenderTextInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, label, required, colClassName = '' } = props;

  const addonAfter = inputProps?.addonAfterText ? <span>{inputProps.addonAfterText}</span> : null;

  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        label={label ?? label}
        required={required ?? required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input {...inputProps} addonAfter={addonAfter} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderTextAreaInput: React.FC<PropType.IRenderTextAreaInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.TextArea {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderNumberInput: React.FC<PropType.IRenderNumberInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <InputNumber {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderPasswordInput: React.FC<PropType.IRenderPasswordInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.Password {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderSelect: React.FC<PropType.IRenderSelectProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Select
          {...inputProps}
          allowClear={inputProps?.allowClear ?? true}
          size={inputProps?.size ?? 'middle'}
          showSearch={inputProps?.showSearch ?? true}
          filterOption={
            inputProps?.filterOption ??
            ((input: string, option: any) => {
              return (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input?.toString().toLowerCase());
            })
          }
        />
      </Form.Item>
    </Col>
  );
};

export const RenderSearchInput: React.FC<PropType.IRenderSearchInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.Search {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderDatePickerInput: React.FC<PropType.IRenderDatePickerInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <DatePicker
          {...inputProps}
          format="MM-DD-YYYY"
          disabledDate={inputProps?.disabledDate ?? undefined}
          size={inputProps?.size ?? 'middle'}
          showNow={inputProps?.showNow ?? false}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxInput: React.FC<PropType.IRenderCheckboxInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Checkbox {...inputProps}>{props?.children}</Checkbox>
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxGroupInput: React.FC<PropType.IRenderCheckboxGroupInputProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, colClassName = '', options } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Checkbox.Group {...inputProps}>
          {options?.map((option) => (
            <Checkbox {...option} key={option.id || option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </Col>
  );
};

export const RenderRadioInput: React.FC<PropType.IRenderRadioInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Radio {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const RenderRadioGroupInput: React.FC<PropType.IRenderRadioGroupInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Radio.Group
          {...inputProps}
          size={inputProps?.size ?? 'middle'}
          buttonStyle={inputProps?.buttonStyle ?? 'solid'}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPatternFormatInput: React.FC<PropType.IRenderPatternFormatInputProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, colClassName = '', format } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item
        className={`${formItemProps?.className ?? ''} patter-format-wrap`}
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <PatternFormat
          size="middle"
          {...inputProps}
          format={format ?? '(###) ###-####'}
          customInput={Input}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderOtpInput: React.FC<PropType.IRenderOtpInputProps> = (props) => {
  const { colProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <OtpInput
        value={props.value}
        onChange={props.onChange}
        numInputs={props.numInputs}
        renderSeparator={props.renderSeparator || null}
        inputType="tel"
        renderInput={(inputProps) => (
          <input {...inputProps} disabled={props.disabled} placeholder="-" />
        )}
      />
    </Col>
  );
};

// export const CKEditorFormItem = (props: any) => {
//   return (
//     <Form.Item
//       labelCol={props?.labelCol}
//       wrapperCol={props?.wrapperCol}
//       name={props?.name}
//       rules={props?.rules}
//       required={props?.required}
//     >
//       <CKEditor editor={ClassicEditor} data={props?.data} onChange={props?.onChange} />
//     </Form.Item>
//   );
// };

// export const RenderGoogleAutocompleteInput: React.FC<PropType.IRenderGoogleAutocompleteProps> = (
//   props
// ) => {
//   const { colProps, formItemProps, inputProps, googleAutocompleteProps, colClassName = '' } = props;

//   return (
//     <Col {...colProps} className={colClassName}>
//       <Form.Item
//         {...formItemProps}
//         className={`${formItemProps?.className ?? ''} autoCompleteFormItem`}
//         labelCol={{ span: 24 }}
//         wrapperCol={{ span: 24 }}
//       >
//         <GoogleAutocomplete
//           apiKey={GOOGLE_API_KEY}
//           className={`${inputProps?.className} autoCompleteInput`}
//           onPlaceSelected={googleAutocompleteProps.onPlaceSelected}
//           options={googleAutocompleteProps.options}
//           {...(inputProps as ReactGoogleAutocompleteInputProps)}
//         />
//       </Form.Item>
//     </Col>
//   );
// };
