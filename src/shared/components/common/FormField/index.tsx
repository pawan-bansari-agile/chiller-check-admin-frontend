import React from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Tooltip } from 'antd';
import GoogleAutocomplete, { ReactGoogleAutocompleteInputProps } from 'react-google-autocomplete';
import { PatternFormat } from 'react-number-format';
import OtpInput from 'react-otp-input';

import { GOOGLE_KEY } from '@/shared/constants';

import * as PropType from './types';

export const RenderTextInput: React.FC<PropType.IRenderTextInputProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    label,
    required,
    colClassName = '',
    tooltip
  } = props;

  const addonAfter = inputProps?.addonAfterText ? <span>{inputProps.addonAfterText}</span> : null;
  const addonBefore = inputProps?.addonBefore ? <span>{inputProps.addonBefore}</span> : null;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        label={label ? labelNode : undefined}
        required={required ?? required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          {...inputProps}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          size={inputProps?.size ?? 'middle'}
        />
      </Form.Item>
    </div>
  );
};

export const RenderTextAreaInput: React.FC<PropType.IRenderTextAreaInputProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    label,
    required,
    tooltip
  } = props;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        label={labelNode}
        required={required ?? required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.TextArea {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </div>
  );
};

export const RenderNumberInput: React.FC<PropType.IRenderNumberInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <InputNumber {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </div>
  );
};

export const RenderPasswordInput: React.FC<PropType.IRenderPasswordInputProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    label,
    tooltip,
    required
  } = props;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        required={required}
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={labelNode}
      >
        <Input.Password {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </div>
  );
};

export const RenderSelect: React.FC<PropType.IRenderSelectProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    label,
    tooltip,
    required
  } = props;

  const labelNode = label ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  ) : undefined;

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        required={required}
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={labelNode}
      >
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
    </div>
  );
};

export const RenderSelectDropDown: React.FC<PropType.IRenderSelectProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    label,
    tooltip,
    required
  } = props;

  const labelNode = label ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  ) : undefined;

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        required={required}
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={labelNode}
      >
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
    </div>
  );
};

export const RenderSearchInput: React.FC<PropType.IRenderSearchInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.Search {...inputProps} size={inputProps?.size ?? 'middle'} />
      </Form.Item>
    </div>
  );
};

export const RenderDatePickerInput: React.FC<PropType.IRenderDatePickerInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '', tooltip, label } = props;

  const renderLabelWithTooltip = () => {
    if (!label) return null;

    return tooltip ? (
      <span>
        {label}
        <Tooltip title={tooltip}>
          <InfoCircleOutlined style={{ marginLeft: 4, color: '#000ABC' }} />
        </Tooltip>
      </span>
    ) : (
      label
    );
  };

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={renderLabelWithTooltip()}
      >
        <DatePicker
          {...inputProps}
          format="MM-DD-YYYY"
          disabledDate={inputProps?.disabledDate ?? undefined}
          size={inputProps?.size ?? 'middle'}
          showNow={inputProps?.showNow ?? false}
        />
      </Form.Item>
    </div>
  );
};

export const RenderCheckboxInput: React.FC<PropType.IRenderCheckboxInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Checkbox {...inputProps}>{props?.children}</Checkbox>
      </Form.Item>
    </div>
  );
};

export const RenderCheckboxGroupInput: React.FC<PropType.IRenderCheckboxGroupInputProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, colClassName = '', options, required } = props;
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        required={required ?? required}
      >
        <Checkbox.Group {...inputProps}>
          {options?.map((option) => (
            <Checkbox {...option} key={option.id || option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export const RenderRadioInput: React.FC<PropType.IRenderRadioInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Radio {...inputProps} />
      </Form.Item>
    </div>
  );
};

export const RenderRadioGroupInput: React.FC<PropType.IRenderRadioGroupInputProps> = (props) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    label,
    tooltip,
    required
  } = props;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        required={required}
        label={labelNode}
        {...formItemProps}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Radio.Group
          {...inputProps}
          size={inputProps?.size ?? 'middle'}
          buttonStyle={inputProps?.buttonStyle ?? 'solid'}
        />
      </Form.Item>
    </div>
  );
};

export const RenderPatternFormatInput: React.FC<PropType.IRenderPatternFormatInputProps> = (
  props
) => {
  const {
    colProps,
    formItemProps,
    inputProps,
    colClassName = '',
    format,
    label,
    required,
    tooltip
  } = props;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );
  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        label={label ? labelNode : undefined}
        required={required ?? required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <PatternFormat
          size="middle"
          {...inputProps}
          format={format ?? '### ### ####'}
          customInput={Input}
        />
      </Form.Item>
    </div>
  );
};

export const RenderOtpInput: React.FC<PropType.IRenderOtpInputProps> = (props) => {
  const { colProps, colClassName = '' } = props;
  return (
    <div {...colProps} className={colClassName}>
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
    </div>
  );
};

export const CKEditorFormItem = (props: any) => {
  const { label, tooltip, name, rules, required, labelCol, wrapperCol, data, onChange } = props;

  const labelNode = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip} color="#000ABC">
          <InfoCircleOutlined style={{ color: '#000ABC' }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <Form.Item
      label={labelNode}
      name={name}
      rules={rules}
      required={required}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <CKEditor editor={ClassicEditor as any} data={data} onChange={onChange} />
    </Form.Item>
  );
};

export const RenderGoogleAutocompleteInput: React.FC<PropType.IRenderGoogleAutocompleteProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, googleAutocompleteProps, colClassName = '' } = props;

  return (
    <div {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        className={`${formItemProps?.className ?? ''} autoCompleteFormItem`}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <GoogleAutocomplete
          apiKey={GOOGLE_KEY}
          className={`${inputProps?.className} autoCompleteInput`}
          onPlaceSelected={googleAutocompleteProps.onPlaceSelected}
          options={googleAutocompleteProps.options}
          {...(inputProps as ReactGoogleAutocompleteInputProps)}
        />
      </Form.Item>
    </div>
  );
};
