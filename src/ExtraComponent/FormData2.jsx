import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveLeft, Plus } from "lucide-react";
import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Info } from "lucide-react";
import Select from "react-select";

// import * as Config from "../../Utils/Config";

const DynamicForm = ({
  fields,
  page_title,
  btn_name1,
  btn_name1_route,
  formik,
  btn_name,
  additional_field,
  btn_status,
  content_btn_name,
  content_path,
  btn_name2,
}) => {
  const [previews, setPreviews] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [defultSelect, setDefultSelect] = useState("");
  const handleFileChange = (event, index, name) => {
    if (event.target.files[0].size > 420000) {
      alert("Select file less then 420KB");
      event.target.value = "";
      return;
    } else {
      const file = event.target.files[0];
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
      formik.setFieldValue(name, file);
    }
  };
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const minTime = dayjs().hour(9).minute(0).second(0);

  const handleChange = (selected, name) => {
    setSelectedOptions1({ ...selectedOptions1, [name]: selected });

    formik.setFieldValue(
      name,
      selected.map((option) => option.value)
    );
  };

  useEffect(() => {
    setDefultSelect("Scalping");
  }, []);

  return (
    <>
      <div data-aos="fade-left">
        <div className="mb-0">
          {page_title && (
            <div className="card-header">
              {page_title ? (
                <h5
                  className="card-title mb-0 w-auto mt-2 mb-2"
                  style={{ fontWeight: "600", fontSize: "23px" }}
                >
                  <i className="fa-regular fa-circle-user pe-2"></i>
                  {page_title}
                </h5>
              ) : (
                ""
              )}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="card-body ">
              <div className="page-header">
                <div className="content-page-header d-flex justify-content-between align-items-center">
                  {btn_status == "true" ? (
                    content_btn_name == "Back" ? (
                      <Link to={content_path} className="btn btn-primary">
                        {" "}
                        <MoveLeft /> {content_btn_name}{" "}
                      </Link>
                    ) : (
                      <Link to={content_path} className="btn btn-primary">
                        {" "}
                        <Plus /> {content_btn_name}{" "}
                      </Link>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row d-flex ">
                {fields.map((field, index) => (
                  <React.Fragment key={index}>
                    {field?.headingtype == 1 ? (
                      <div className="iq-card mt-4">
                        {field.label === "Symbol_Selection" && (
                          <>
                            <div className=" d-flex justify-content-between ">
                              <div className="iq-header-title">
                                <h4 className="card-title">Symbol Selection</h4>
                              </div>
                            </div>

                            <div className="iq-card-body row dark-card dark-card">
                              {field.data.map((item, index) => {
                                switch (item.type) {
                                  case "text":
                                    return (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        key={index}
                                      >
                                        <div className="input-block mb-3 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              i
                                            </span>
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            placeholder={`Enter ${item.label}`}
                                            readOnly={item.disable}
                                            id={item.name}
                                            autoComplete="new-password"
                                            name={item.name}
                                            value={
                                              formik.values[item.name] || ""
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {formik.touched[item.name] &&
                                          formik.errors[item.name] ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    );
                                  case "text5":
                                    return (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        key={index}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mb-3">
                                              <label
                                                className={`col-lg-${item.label_size} card-text-Color`}
                                                htmlFor={item.name}
                                              >
                                                {item.label}
                                              </label>
                                              <span className="text-danger">
                                                *
                                              </span>
                                              <input
                                                type="text"
                                                name={item.name}
                                                readOnly={item.disable}
                                                aria-describedby="basic-addon1"
                                                className="form-control"
                                                id={item.name}
                                                ref={item?.inputRef}
                                                placeholder={`Enter ${item.label}`}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                                onChange={(e) => {
                                                  let value = e.target.value;
                                                  if (
                                                    /^\d*\.?\d*$/.test(value) &&
                                                    value.length <= 10
                                                  ) {
                                                    value = value.replace(
                                                      /^0+(?!\.)/,
                                                      ""
                                                    );
                                                    formik.setFieldValue(
                                                      item.name,
                                                      value
                                                    );
                                                  }
                                                }}
                                              />
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  case "text2":
                                    return (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        key={index}
                                      >
                                        <div className="input-block mb-3 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            placeholder={`Enter ${item.label}`}
                                            readOnly={item.disable}
                                            id={item.name}
                                            name={item.name}
                                            value={inputValue}
                                            onChange={(e) => {
                                              const newValue =
                                                e.target.value.toUpperCase();
                                              if (
                                                /^[a-zA-Z]{0,3}$/.test(newValue)
                                              ) {
                                                setInputValue(newValue);
                                                formik.handleChange(e);
                                              }
                                            }}
                                          />
                                          {inputValue === "" ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    );
                                  case "select":
                                    return (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        key={index}
                                      >
                                        <div className="input-block row mb-3">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                            htmlFor={item.name}
                                          >
                                            {item.label}
                                            {item.iconText && (
                                              <span className="custom-tooltip-wrapper">
                                                <span
                                                  className="info-icon-container"
                                                  data-tooltip={item.iconText}
                                                >
                                                  <Info
                                                    style={{
                                                      width: "15px",
                                                      fill: "transparent",
                                                    }}
                                                    className="mx-1"
                                                  />
                                                </span>
                                              </span>
                                            )}
                                          </label>
                                          <div>
                                            <select
                                              className="default-select wide form-control"
                                              aria-describedby="basic-addon1"
                                              disabled={item.disable}
                                              id={item.name}
                                              {...formik.getFieldProps(
                                                item.name
                                              )}
                                            >
                                              <option value="">{`Select ${item.label}`}</option>
                                              {item.options
                                                .filter((option) =>
                                                  item?.options1?.includes(
                                                    option?.label
                                                  )
                                                )
                                                .map((option) => (
                                                  <option
                                                    key={option.value}
                                                    value={option.value}
                                                    className="green"
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                              {item.options
                                                .filter(
                                                  (option) =>
                                                    !item?.options1?.includes(
                                                      option?.label
                                                    )
                                                )
                                                .map((option) => (
                                                  <option
                                                    key={option.value}
                                                    value={option.value}
                                                    className="black"
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                            </select>
                                            {formik.touched[item.name] &&
                                            formik.errors[item.name] ? (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  case "heading":
                                    return (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        key={index}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mt-3">
                                              <h5 style={{ fontWeight: 600 }}>
                                                {item.label}
                                              </h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  default:
                                    return (
                                      <div className="iq-card" key={index}>
                                        <div className="iq-card-body">
                                          <div
                                            className={`col-lg-${item.col_size}`}
                                          >
                                            <div className="input-block mb-3"></div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                }
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 11 ? (
                      <div className="iq-card">
                        {field.label === "Entry_Rule" && (
                          <>
                            <div className="row">
                           {field.data2 &&   <>
                            <div className=" d-flex justify-content-between">
                                <div className="iq-header-title">
                                  <h4 className="card-title">Entry Rule</h4>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="iq-card-body row dark-card">
                                  {field.data.map((item, index) => {
                                    return (
                                      <>
                                        {item.type === "text" ? (
                                          <div
                                            className={`col-lg-${item.col_size}`}
                                          >
                                            <div className="input-block mb-3 flex-column">
                                              <label
                                                className={`col-lg-${item.label_size} card-text-Color`}
                                                htmlFor={item.name}
                                              >
                                                {item.label}
                                                {item.iconText && (
                                                  <span className="custom-tooltip-wrapper">
                                                    <span
                                                      className="info-icon-container"
                                                      data-tooltip={
                                                        item.iconText
                                                      }
                                                    >
                                                      <Info
                                                        style={{
                                                          width: "15px",
                                                          fill: "transparent",
                                                        }}
                                                        className="mx-1"
                                                      />
                                                    </span>
                                                  </span>
                                                )}
                                              </label>

                                              <input
                                                type="text"
                                                aria-describedby="basic-addon1"
                                                className="form-control"
                                                placeholder={`Enter ${item.label}`}
                                                readOnly={item.disable}
                                                id={item.name}
                                                autoComplete="new-password"
                                                name={item.name}
                                                defaultValue={""}
                                                value={
                                                  formik.values[item.name] || ""
                                                }
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                              />
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        ) : item.type === "text5" ? (
                                          <div
                                            className={`col-lg-${item.col_size}`}
                                          >
                                            <div className="row d-flex">
                                              <div className="col-lg-12">
                                                <div className="form-group input-block mb-3">
                                                  <label
                                                    className={`col-lg-${item.label_size} card-text-Color`}
                                                    htmlFor={item.name}
                                                  >
                                                    {item.label}
                                                  </label>
                                                  <span className="text-danger">
                                                    *
                                                  </span>
                                                  <input
                                                    type="text"
                                                    name={item.name}
                                                    readOnly={item.disable}
                                                    aria-describedby="basic-addon1"
                                                    className="form-control"
                                                    id={item.name}
                                                    placeholder={`Enter ${item.label}`}
                                                    {...formik.getFieldProps(
                                                      item.name
                                                    )}
                                                    onChange={(e) => {
                                                      let value =
                                                        e.target.value;
                                                      if (
                                                        /^\d*\.?\d*$/.test(
                                                          value
                                                        ) &&
                                                        value.length <= 10
                                                      ) {
                                                        value = value.replace(
                                                          /^0+(?!\.)/,
                                                          ""
                                                        );
                                                        formik.setFieldValue(
                                                          item.name,
                                                          value
                                                        );
                                                      }
                                                    }}
                                                  />
                                                  {formik.touched[item.name] &&
                                                  formik.errors[item.name] ? (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {formik.errors[item.name]}
                                                    </div>
                                                  ) : null}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : item.type === "number" ? (
                                          <>
                                            <div
                                              className={`col-lg-${item.col_size}`}
                                            >
                                              <div className="row d-flex">
                                                <div className="col-lg-12 ">
                                                  <div className="form-group input-block mb-3">
                                                    <label
                                                      className={`col-lg-${item.label_size} card-text-Color`}
                                                      htmlFor={item.name}
                                                    >
                                                      {item.label}
                                                      {item.iconText && (
                                                        <span className="custom-tooltip-wrapper">
                                                          <span
                                                            className="info-icon-container"
                                                            data-tooltip={
                                                              item.iconText
                                                            }
                                                          >
                                                            <Info
                                                              style={{
                                                                width: "15px",
                                                                fill: "transparent",
                                                              }}
                                                              className="mx-1"
                                                            />
                                                          </span>
                                                        </span>
                                                      )}
                                                    </label>

                                                    <input
                                                      type="number"
                                                      name={item.name}
                                                      aria-describedby="basic-addon1"
                                                      className="form-control"
                                                      id={item.name}
                                                      placeholder={`Enter ${item.label}`}
                                                      {...formik.getFieldProps(
                                                        item.name
                                                      )}
                                                    />

                                                    {formik.touched[
                                                      item.name
                                                    ] &&
                                                    formik.errors[item.name] ? (
                                                      <div
                                                        style={{ color: "red" }}
                                                      >
                                                        {
                                                          formik.errors[
                                                            item.name
                                                          ]
                                                        }
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : item.type === "select" ? (
                                          <div
                                            className={`col-lg-${item.col_size}`}
                                          >
                                            <div className="input-block row mb-3">
                                              <label
                                                className={`col-lg-${item.label_size} card-text-Color`}
                                                htmlFor={item.name}
                                              >
                                                {item.label}
                                                {item.iconText && (
                                                  <span className="custom-tooltip-wrapper">
                                                    <span
                                                      className="info-icon-container"
                                                      data-tooltip={
                                                        item.iconText
                                                      }
                                                    >
                                                      <Info
                                                        style={{
                                                          width: "15px",
                                                          fill: "transparent",
                                                        }}
                                                        className="mx-1"
                                                      />
                                                    </span>
                                                  </span>
                                                )}
                                              </label>
                                              <div>
                                                <select
                                                  className="default-select wide form-control"
                                                  aria-describedby="basic-addon1"
                                                  disabled={item.disable}
                                                  id={item.name}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                >
                                                  <option value="">{`Select ${item.label}`}</option>
                                                  {/* Filtered options */}
                                                  {item.options
                                                    .filter((option) =>
                                                      item?.options1?.includes(
                                                        option?.label
                                                      )
                                                    )
                                                    .map((option) => (
                                                      <option
                                                        className="green"
                                                        key={option.value}
                                                        value={option.value}
                                                      >
                                                        {option.label}
                                                      </option>
                                                    ))}
                                                  {/* Non-filtered options */}
                                                  {item.options
                                                    .filter(
                                                      (option) =>
                                                        !item?.options1?.includes(
                                                          option?.label
                                                        )
                                                    )
                                                    .map((option) => (
                                                      <option
                                                        className="black"
                                                        key={option.value}
                                                        value={option.value}
                                                      >
                                                        {option.label}
                                                      </option>
                                                    ))}
                                                </select>
                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        ) : item.type === "select1" ? (
                                          <>
                                            <div
                                              className={` col-lg-${item.col_size}`}
                                            >
                                              <div className="input-block row mb-3">
                                                <label
                                                  className={` col-lg-${item.label_size} card-text-Color`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  <span className="text-danger">
                                                    *
                                                  </span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>

                                                <div>
                                                  <select
                                                    className="default-select wide form-control"
                                                    aria-describedby="basic-addon1"
                                                    disabled={item.disable}
                                                    id={item.name}
                                                    {...formik.getFieldProps(
                                                      item.name
                                                    )}
                                                  >
                                                    <option value="">{`Select ${item.label}`}</option>
                                                    {item.options.map(
                                                      (option, index) => (
                                                        <option
                                                          key={option.value}
                                                          value={option.value}
                                                        >
                                                          {option.label}
                                                        </option>
                                                      )
                                                    )}
                                                  </select>
                                                  {formik.touched[item.name] &&
                                                  formik.errors[item.name] ? (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {formik.errors[item.name]}
                                                    </div>
                                                  ) : null}
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : item.type === "text4" ? (
                                          <>
                                            <div
                                              className={`col-lg-${item.col_size}`}
                                            >
                                              <div className="row d-flex">
                                                <div className="col-lg-12">
                                                  <div className="form-group input-block mb-3">
                                                    <label
                                                      htmlFor={item.name}
                                                      className={`d-flex align-items-center gap-1 col-lg-${item.label_size} card-text-Color`}
                                                    >
                                                      <span>{item.label}</span>
                                                      {item.iconText && (
                                                        <span className="custom-tooltip-wrapper">
                                                          <span
                                                            className="info-icon-container"
                                                            data-tooltip={
                                                              item.iconText
                                                            }
                                                          >
                                                            <Info
                                                              style={{
                                                                width: "15px",
                                                                fill: "transparent",
                                                              }}
                                                              className="mx-1"
                                                            />
                                                          </span>
                                                        </span>
                                                      )}
                                                    </label>

                                                    <input
                                                      type="number"
                                                      name={item.name}
                                                      readOnly={item.disable}
                                                      aria-describedby="basic-addon1"
                                                      className="form-control"
                                                      id={item.name}
                                                      placeholder={`Enter ${item.label}`}
                                                      {...formik.getFieldProps(
                                                        item.name
                                                      )}
                                                      min={1}
                                                      step="any"
                                                      onChange={(e) => {
                                                        let value =
                                                          e.target.value;
                                                        value = value.replace(
                                                          /^0+(?!\.)/,
                                                          ""
                                                        );
                                                        if (value !== "") {
                                                          value = Math.min(
                                                            Math.max(
                                                              parseFloat(value),
                                                              1
                                                            ),
                                                            100
                                                          );
                                                        }
                                                        formik.setFieldValue(
                                                          item.name,
                                                          value
                                                        );
                                                      }}
                                                    />

                                                    {formik.touched[
                                                      item.name
                                                    ] &&
                                                      formik.errors[
                                                        item.name
                                                      ] && (
                                                        <div
                                                          style={{
                                                            color: "red",
                                                          }}
                                                        >
                                                          {
                                                            formik.errors[
                                                              item.name
                                                            ]
                                                          }
                                                        </div>
                                                      )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : item.type === "text3" ? (
                                          <>
                                            <div
                                              className={`col-lg-${item.col_size}`}
                                            >
                                              <div className="row d-flex">
                                                <div className="col-lg-12">
                                                  <div className="form-group input-block mb-3">
                                                    <label
                                                      className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                                      htmlFor={item.name}
                                                    >
                                                      {item.label}
                                                      <span className="text-danger ms-1">
                                                        *
                                                      </span>
                                                      {item.iconText && (
                                                        <span className="custom-tooltip-wrapper">
                                                          <span
                                                            className="info-icon-container"
                                                            data-tooltip={
                                                              item.iconText
                                                            }
                                                          >
                                                            <Info
                                                              style={{
                                                                width: "15px",
                                                                fill: "transparent",
                                                              }}
                                                              className="mx-1"
                                                            />
                                                          </span>
                                                        </span>
                                                      )}
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name={item.name}
                                                      readOnly={item.disable}
                                                      aria-describedby="basic-addon1"
                                                      className="form-control"
                                                      id={item.name}
                                                      placeholder={`Enter ${item.label}`}
                                                      {...formik.getFieldProps(
                                                        item.name
                                                      )}
                                                      onChange={(e) => {
                                                        let value =
                                                          e.target.value;
                                                        if (
                                                          /^\d*\.?\d*$/.test(
                                                            value
                                                          ) &&
                                                          value.length <= 10
                                                        ) {
                                                          formik.setFieldValue(
                                                            item.name,
                                                            value
                                                          );
                                                        }
                                                      }}
                                                    />
                                                    {formik.touched[
                                                      item.name
                                                    ] &&
                                                    formik.errors[item.name] ? (
                                                      <div
                                                        style={{ color: "red" }}
                                                      >
                                                        {
                                                          formik.errors[
                                                            item.name
                                                          ]
                                                        }
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : item.type === "OnlyCharacter" ? (
                                          <>
                                            <div
                                              className={`col-lg-${item.col_size}`}
                                            >
                                              <div className="row d-flex">
                                                <div className="col-lg-12">
                                                  <div className="form-group input-block mb-3">
                                                    <label
                                                      className={`col-lg-${item.label_size} card-text-Color`}
                                                      htmlFor={item.name}
                                                    >
                                                      {item.label}
                                                      {item.iconText && (
                                                        <span className="custom-tooltip-wrapper">
                                                          <span
                                                            className="info-icon-container"
                                                            data-tooltip={
                                                              item.iconText
                                                            }
                                                          >
                                                            <Info
                                                              style={{
                                                                width: "15px",
                                                                fill: "transparent",
                                                              }}
                                                              className="mx-1"
                                                            />
                                                          </span>
                                                        </span>
                                                      )}
                                                    </label>
                                                    <input
                                                      type="text"
                                                      name={item.name}
                                                      readOnly={item.disable}
                                                      aria-describedby="basic-addon1"
                                                      className="form-control"
                                                      id={item.name}
                                                      placeholder={`Enter ${item.label}`}
                                                      {...formik.getFieldProps(
                                                        item.name
                                                      )}
                                                      onChange={(e) => {
                                                        let value =
                                                          e.target.value;
                                                        // Only allow letters (uppercase/lowercase) and spaces.
                                                        if (
                                                          /^[A-Za-z\s]*$/.test(
                                                            value
                                                          )
                                                        ) {
                                                          formik.setFieldValue(
                                                            item.name,
                                                            value
                                                          );
                                                        }
                                                      }}
                                                    />
                                                    {formik.touched[
                                                      item.name
                                                    ] &&
                                                    formik.errors[item.name] ? (
                                                      <div
                                                        style={{ color: "red" }}
                                                      >
                                                        {
                                                          formik.errors[
                                                            item.name
                                                          ]
                                                        }
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : item.type === "heading" ? (
                                          <div
                                            className={`col-lg-${item.col_size}`}
                                          >
                                            <div className="row d-flex">
                                              <div className="col-lg-12">
                                                <div className="form-group input-block mt-3">
                                                  <h5
                                                    style={{ fontWeight: 600 }}
                                                  >
                                                    {item.label}
                                                  </h5>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                           </>}

                              {field.data1 && (
                                <div className="col-lg-6">
                                
                                  <div className="row dark-card ms-2">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <table
                                        className="table table-bordered"
                                        style={{
                                          color: "#e0e0e0",
                                          fontSize: "0.675rem",
                                          borderCollapse: "collapse",
                                          backgroundColor: "#1a1a1a",
                                          minWidth: "320px",
                                          maxWidth: "80%",
                                          textAlign: "center",
                                          border: "1px solid #444",
                                          boxShadow:
                                            "0 0 10px rgba(255,255,255,0.05)",
                                          margin: "1rem",
                                        }}
                                      >
                                        <thead
                                          style={{ backgroundColor: "#2c2c2c" }}
                                        >
                                          <tr>
                                            <th
                                              style={{
                                                padding: "2px 6px",
                                                border: "1px solid #444",
                                                fontSize: "15px",
                                              }}
                                            >
                                              Strike
                                            </th>
                                            <th
                                              style={{
                                                padding: "2px 6px",
                                                border: "1px solid #444",
                                                fontSize: "15px",
                                              }}
                                            >
                                              Price
                                            </th>
                                            <th
                                              style={{
                                                padding: "2px 6px",
                                                border: "1px solid #444",
                                                fontSize: "15px",
                                              }}
                                            >
                                              Symbol
                                            </th>
                                            <th
                                              style={{
                                                padding: "2px 6px",
                                                border: "1px solid #444",
                                                fontSize: "15px",
                                              }}
                                            >
                                              Trade Type
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {[
                                            ["One", "CESymbol", "PESymbol"],
                                            ["Second", "CESymbol", "PESymbol"],
                                            ["Third", "CESymbol", "PESymbol"],
                                          ].map(([prefix, ceKey, peKey]) => (
                                            <>
                                              {field.data1[
                                                `${prefix}${ceKey}`
                                              ] && (
                                                <tr>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}CEStrike`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}CEPrice`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}${ceKey}`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}CETradetype`
                                                      ]
                                                    }
                                                  </td>
                                                </tr>
                                              )}
                                              {field.data1[
                                                `${prefix}${peKey}`
                                              ] && (
                                                <tr>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}PEStrike`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}PEPrice`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}${peKey}`
                                                      ]
                                                    }
                                                  </td>
                                                  <td
                                                    style={{
                                                      padding: "2px 6px",
                                                      border: "1px solid #444",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {
                                                      field.data1[
                                                        `${prefix}PETradetype`
                                                      ]
                                                    }
                                                  </td>
                                                </tr>
                                              )}
                                            </>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 2 ? (
                      <div className="iq-card">
                        {field.label === "Entry_Rule" && (
                          <>
                            <div className=" d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Entry Rule</h4>
                              </div>
                            </div>
                            <div className="iq-card-body row dark-card">
                              {field.data.map((item, index) => {
                                return (
                                  <>
                                    {item.type === "text" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="input-block mb-3 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                            htmlFor={item.name}
                                          >
                                            {item.label}
                                            {item.iconText && (
                                              <span className="custom-tooltip-wrapper">
                                                <span
                                                  className="info-icon-container"
                                                  data-tooltip={item.iconText}
                                                >
                                                  <Info
                                                    style={{
                                                      width: "15px",
                                                      fill: "transparent",
                                                    }}
                                                    className="mx-1"
                                                  />
                                                </span>
                                              </span>
                                            )}
                                          </label>

                                          <input
                                            type="text"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            placeholder={`Enter ${item.label}`}
                                            readOnly={item.disable}
                                            id={item.name}
                                            autoComplete="new-password"
                                            name={item.name}
                                            defaultValue={""}
                                            value={
                                              formik.values[item.name] || ""
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {formik.touched[item.name] &&
                                          formik.errors[item.name] ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    ) : item.type === "text5" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mb-3">
                                              <label
                                                className={`col-lg-${item.label_size} card-text-Color`}
                                                htmlFor={item.name}
                                              >
                                                {item.label}
                                              </label>
                                              <span className="text-danger">
                                                *
                                              </span>
                                              <input
                                                type="text"
                                                name={item.name}
                                                readOnly={item.disable}
                                                aria-describedby="basic-addon1"
                                                className="form-control"
                                                id={item.name}
                                                placeholder={`Enter ${item.label}`}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                                onChange={(e) => {
                                                  let value = e.target.value;
                                                  if (
                                                    /^\d*\.?\d*$/.test(value) &&
                                                    value.length <= 10
                                                  ) {
                                                    value = value.replace(
                                                      /^0+(?!\.)/,
                                                      ""
                                                    );
                                                    formik.setFieldValue(
                                                      item.name,
                                                      value
                                                    );
                                                  }
                                                }}
                                              />
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : item.type === "number" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12 ">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  className={`col-lg-${item.label_size} card-text-Color`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>

                                                <input
                                                  type="number"
                                                  name={item.name}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                />

                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "select" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="input-block row mb-3">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                            htmlFor={item.name}
                                          >
                                            {item.label}
                                            {item.iconText && (
                                              <span className="custom-tooltip-wrapper">
                                                <span
                                                  className="info-icon-container"
                                                  data-tooltip={item.iconText}
                                                >
                                                  <Info
                                                    style={{
                                                      width: "15px",
                                                      fill: "transparent",
                                                    }}
                                                    className="mx-1"
                                                  />
                                                </span>
                                              </span>
                                            )}
                                          </label>
                                          <div>
                                            <select
                                              className="default-select wide form-control"
                                              aria-describedby="basic-addon1"
                                              disabled={item.disable}
                                              id={item.name}
                                              {...formik.getFieldProps(
                                                item.name
                                              )}
                                            >
                                              <option value="">{`Select ${item.label}`}</option>
                                              {/* Filtered options */}
                                              {item.options
                                                .filter((option) =>
                                                  item?.options1?.includes(
                                                    option?.label
                                                  )
                                                )
                                                .map((option) => (
                                                  <option
                                                    className="green"
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                              {/* Non-filtered options */}
                                              {item.options
                                                .filter(
                                                  (option) =>
                                                    !item?.options1?.includes(
                                                      option?.label
                                                    )
                                                )
                                                .map((option) => (
                                                  <option
                                                    className="black"
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </option>
                                                ))}
                                            </select>
                                            {formik.touched[item.name] &&
                                            formik.errors[item.name] ? (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    ) : item.type === "select1" ? (
                                      <>
                                        <div
                                          className={` col-lg-${item.col_size}`}
                                        >
                                          <div className="input-block row mb-3">
                                            <label
                                              className={` col-lg-${item.label_size} card-text-Color`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              <span className="text-danger">
                                                *
                                              </span>
                                              {item.iconText && (
                                                <span className="custom-tooltip-wrapper">
                                                  <span
                                                    className="info-icon-container"
                                                    data-tooltip={item.iconText}
                                                  >
                                                    <Info
                                                      style={{
                                                        width: "15px",
                                                        fill: "transparent",
                                                      }}
                                                      className="mx-1"
                                                    />
                                                  </span>
                                                </span>
                                              )}
                                            </label>

                                            <div>
                                              <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                disabled={item.disable}
                                                id={item.name}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                              >
                                                <option value="">{`Select ${item.label}`}</option>
                                                {item.options.map(
                                                  (option, index) => (
                                                    <option
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "text4" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  htmlFor={item.name}
                                                  className={`d-flex align-items-center gap-1 col-lg-${item.label_size} card-text-Color`}
                                                >
                                                  <span>{item.label}</span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>

                                                <input
                                                  type="number"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  min={1}
                                                  step="any"
                                                  onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(
                                                      /^0+(?!\.)/,
                                                      ""
                                                    );
                                                    if (value !== "") {
                                                      value = Math.min(
                                                        Math.max(
                                                          parseFloat(value),
                                                          1
                                                        ),
                                                        100
                                                      );
                                                    }
                                                    formik.setFieldValue(
                                                      item.name,
                                                      value
                                                    );
                                                  }}
                                                />

                                                {formik.touched[item.name] &&
                                                  formik.errors[item.name] && (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {formik.errors[item.name]}
                                                    </div>
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "text3" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  <span className="text-danger ms-1">
                                                    *
                                                  </span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>
                                                <input
                                                  type="text"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  onChange={(e) => {
                                                    let value = e.target.value;
                                                    if (
                                                      /^\d*\.?\d*$/.test(
                                                        value
                                                      ) &&
                                                      value.length <= 10
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        value
                                                      );
                                                    }
                                                  }}
                                                />
                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "OnlyCharacter" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  className={`col-lg-${item.label_size} card-text-Color`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>
                                                <input
                                                  type="text"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  onChange={(e) => {
                                                    let value = e.target.value;
                                                    // Only allow letters (uppercase/lowercase) and spaces.
                                                    if (
                                                      /^[A-Za-z\s]*$/.test(
                                                        value
                                                      )
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        value
                                                      );
                                                    }
                                                  }}
                                                />
                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "heading" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mt-3">
                                              <h5 style={{ fontWeight: 600 }}>
                                                {item.label}
                                              </h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : item.type === "premium_range" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  htmlFor={item.name}
                                                  className={`d-flex align-items-center gap-1 col-lg-${item.label_size} card-text-Color`}
                                                >
                                                  <span>{item.label}</span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>

                                                <input
                                                  type="number"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  min={1}
                                                  step="any"
                                                  onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(
                                                      /^0+(?!\.)/,
                                                      ""
                                                    );
                                                    if (value !== "") {
                                                      value = Math.min(
                                                        Math.max(
                                                          parseFloat(value),
                                                          1
                                                        ),
                                                        100
                                                      );
                                                    }
                                                    formik.setFieldValue(
                                                      item.name,
                                                      value
                                                    );
                                                  }}
                                                />

                                                {formik.touched[item.name] &&
                                                  formik.errors[item.name] && (
                                                    <div
                                                      style={{ color: "red" }}
                                                    >
                                                      {formik.errors[item.name]}
                                                    </div>
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : null}
                                  </>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 3 ? (
                      <div className="iq-card">
                        {field.label === "Exit_Rule" && (
                          <>
                            <div className=" d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Exit Rule</h4>
                              </div>
                            </div>
                            <div className="iq-card-body row dark-card">
                              {field.data.map((item, index) => {
                                return (
                                  <>
                                    {item.type === "text" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="input-block mb-4 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              *
                                            </span>
                                            {item.iconText && (
                                              <span className="custom-tooltip-wrapper">
                                                <span
                                                  className="info-icon-container"
                                                  data-tooltip={item.iconText}
                                                >
                                                  <Info
                                                    style={{
                                                      width: "15px",
                                                      fill: "transparent",
                                                    }}
                                                    className="mx-1"
                                                  />
                                                </span>
                                              </span>
                                            )}
                                          </label>

                                          <input
                                            type="text"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            placeholder={`Enter ${item.label}`}
                                            readOnly={item.disable}
                                            id={item.name}
                                            autoComplete="new-password"
                                            name={item.name}
                                            defaultValue={""}
                                            value={
                                              formik.values[item.name] || ""
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {formik.touched[item.name] &&
                                          formik.errors[item.name] ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    ) : item.type === "text3" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  <span className="text-danger ms-1">
                                                    *
                                                  </span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>
                                                <input
                                                  type="text"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  onChange={(e) => {
                                                    let value = e.target.value;
                                                    if (
                                                      /^\d*\.?\d*$/.test(
                                                        value
                                                      ) &&
                                                      value.length <= 10
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        value
                                                      );
                                                    }
                                                  }}
                                                />
                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "select1" ? (
                                      <>
                                        <div
                                          className={` col-lg-${item.col_size}`}
                                        >
                                          <div className="input-block row mb-3">
                                            <label
                                              className={` col-lg-${item.label_size} card-text-Color`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              {item.iconText && (
                                                <span className="custom-tooltip-wrapper">
                                                  <span
                                                    className="info-icon-container"
                                                    data-tooltip={item.iconText}
                                                  >
                                                    <Info
                                                      style={{
                                                        width: "15px",
                                                        fill: "transparent",
                                                      }}
                                                      className="mx-1"
                                                    />
                                                  </span>
                                                </span>
                                              )}
                                            </label>
                                            <div>
                                              <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                disabled={item.disable}
                                                id={item.name}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                              >
                                                <option value="">{`Select ${item.label}`}</option>
                                                {item.options.map(
                                                  (option, index) => (
                                                    <option
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "select" ? (
                                      <>
                                        <div
                                          className={` col-lg-${item.col_size}`}
                                        >
                                          <div className="input-block row mb-3">
                                            <label
                                              className={` col-lg-${item.label_size} card-text-Color`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div>
                                              <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                disabled={item.disable}
                                                id={item.name}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                              >
                                                <option value="">{`Select ${item.label}`}</option>
                                                {item.options.map(
                                                  (option, index) => (
                                                    <option
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "heading" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mt-3"></div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 4 ? (
                      <div className="iq-card">
                        {field.label === "Risk_Management" && (
                          <>
                            <div className=" d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Risk Management</h4>
                              </div>
                            </div>
                            <div className="iq-card-body row dark-card">
                              {field.data.map((item, index) => {
                                return (
                                  <>
                                    {item.type === "text" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="input-block mb-3 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              *
                                            </span>
                                            {item.iconText && (
                                              <span className="custom-tooltip-wrapper">
                                                <span
                                                  className="info-icon-container"
                                                  data-tooltip={item.iconText}
                                                >
                                                  <Info
                                                    style={{
                                                      width: "15px",
                                                      fill: "transparent",
                                                    }}
                                                    className="mx-1"
                                                  />
                                                </span>
                                              </span>
                                            )}
                                          </label>

                                          <input
                                            type="text"
                                            aria-describedby="basic-addon1"
                                            className="form-control"
                                            placeholder={`Enter ${item.label}`}
                                            readOnly={item.disable}
                                            id={item.name}
                                            autoComplete="new-password"
                                            name={item.name}
                                            defaultValue={""}
                                            value={
                                              formik.values[item.name] || ""
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                          />
                                          {formik.touched[item.name] &&
                                          formik.errors[item.name] ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    ) : item.type === "multiselect" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                        id="multiSelectID"
                                      >
                                        <div
                                          className="input-block mb-3 flex-column"
                                          id="multiSelectID2"
                                        >
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color mb-1`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          {/* <Select
                                            options={item.options}
                                            isMulti
                                            className="basic-multi-select"
                                            value={formik.values[item.name]}
                                            onChange={(selected) => {
                                              if (selected) {
                                                // Check if "Select All" (value "all") is part of the selection.
                                                const isSelectAllSelected =
                                                  selected.some(
                                                    (option) =>
                                                      option.value === "all"
                                                  );

                                                if (isSelectAllSelected) {
                                                  // Get all options excluding the "Select All" option.
                                                  const allOptions =
                                                    item.options.filter(
                                                      (option) =>
                                                        option.value !== "all"
                                                    );

                                                  // Toggle behavior: if all options are already selected, clear them; otherwise, select all.
                                                  if (
                                                    selected.length ===
                                                    item.options.length
                                                  ) {
                                                    formik.setFieldValue(
                                                      item.name,
                                                      []
                                                    );
                                                  } else {
                                                    formik.setFieldValue(
                                                      item.name,
                                                      allOptions
                                                    );
                                                  }
                                                } else {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    selected
                                                  );
                                                }
                                              } else {
                                                // If no option is selected, clear the field.
                                                formik.setFieldValue(
                                                  item.name,
                                                  []
                                                );
                                              }
                                            }}
                                            placeholder={
                                              item.placeholder
                                                ? item.placeholder
                                                : "Select options"
                                            }
                                            isDisabled={item.disable}
                                          /> */}

                                          <Select
                                            inputId="multiSelection"
                                            id="multiSelection"
                                            options={[
                                              {
                                                label:
                                                  formik.values[item.name]
                                                    ?.length ===
                                                  item.options?.length
                                                    ? "Deselect All"
                                                    : "Select All",
                                                value: "all",
                                              },
                                              ...item.options,
                                            ]} // Dynamic label for "Select All / Deselect All"
                                            isMulti
                                            className="basic-multi-select"
                                            value={formik.values[item.name]}
                                            onChange={(selected) => {
                                              const isSelectAllSelected =
                                                selected.some(
                                                  (option) =>
                                                    option.value === "all"
                                                );
                                              if (isSelectAllSelected) {
                                                if (
                                                  formik.values[item.name]
                                                    ?.length ===
                                                  item.options?.length
                                                ) {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    []
                                                  ); // Deselect all
                                                } else {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    item.options
                                                  ); // Select all
                                                }
                                              } else {
                                                formik.setFieldValue(
                                                  item.name,
                                                  selected.filter(
                                                    (option) =>
                                                      option.value !== "all"
                                                  )
                                                );
                                              }
                                            }}
                                            placeholder={
                                              item.placeholder
                                                ? item.placeholder
                                                : "Select options"
                                            }
                                            isDisabled={item.disable}
                                          />

                                          {formik.touched[item.name] &&
                                            formik.errors[item.name] && (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    ) : item.type === "text3" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="row d-flex">
                                            <div className="col-lg-12">
                                              <div className="form-group input-block mb-3">
                                                <label
                                                  className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                                  htmlFor={item.name}
                                                >
                                                  {item.label}
                                                  <span className="text-danger ms-1">
                                                    *
                                                  </span>
                                                  {item.iconText && (
                                                    <span className="custom-tooltip-wrapper">
                                                      <span
                                                        className="info-icon-container"
                                                        data-tooltip={
                                                          item.iconText
                                                        }
                                                      >
                                                        <Info
                                                          style={{
                                                            width: "15px",
                                                            fill: "transparent",
                                                          }}
                                                          className="mx-1"
                                                        />
                                                      </span>
                                                    </span>
                                                  )}
                                                </label>
                                                <input
                                                  type="text"
                                                  name={item.name}
                                                  readOnly={item.disable}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  id={item.name}
                                                  placeholder={`Enter ${item.label}`}
                                                  {...formik.getFieldProps(
                                                    item.name
                                                  )}
                                                  onChange={(e) => {
                                                    let value = e.target.value;

                                                    if (
                                                      item.name === "stepup" &&
                                                      value === "0"
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        "1"
                                                      );
                                                      return;
                                                    }

                                                    if (
                                                      item.name === "stepup" &&
                                                      value === "."
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        "1"
                                                      );
                                                      return;
                                                    }

                                                    if (
                                                      /^\d*\.?\d*$/.test(
                                                        value
                                                      ) &&
                                                      value.length <= 10
                                                    ) {
                                                      formik.setFieldValue(
                                                        item.name,
                                                        value
                                                      );
                                                    }
                                                  }}
                                                />
                                                {formik.touched[item.name] &&
                                                formik.errors[item.name] ? (
                                                  <div style={{ color: "red" }}>
                                                    {formik.errors[item.name]}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "timepiker" ? (
                                      <>
                                        <div
                                          className={`col-lg-${item.col_size}`}
                                        >
                                          <div className="input-block mb-3 flex-column">
                                            <label
                                              className={`col-lg-${item.label_size} card-text-Color`}
                                            >
                                              {item.label}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>

                                            <LocalizationProvider
                                              dateAdapter={AdapterDayjs}
                                            >
                                              <TimePicker
                                                className="ddddd"
                                                value={
                                                  formik.values[item.name]
                                                    ? dayjs(
                                                        formik.values[
                                                          item.name
                                                        ],
                                                        "HH:mm:ss"
                                                      )
                                                    : null
                                                }
                                                onChange={(newValue) => {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    newValue
                                                      ? newValue.format(
                                                          "HH:mm:ss"
                                                        )
                                                      : ""
                                                  );
                                                }}
                                                minTime={minTime}
                                                views={[
                                                  "hours",
                                                  "minutes",
                                                  "seconds",
                                                ]}
                                                ampm={false} // This sets the time picker to 24-hour format
                                                renderInput={(params) => (
                                                  <input
                                                    {...params.inputProps}
                                                    aria-describedby="basic-addon1"
                                                    className="form-control"
                                                    placeholder={`Enter ${item.label}`}
                                                    readOnly={item.disable}
                                                    id={item.name}
                                                    name={item.name}
                                                  />
                                                )}
                                              />
                                            </LocalizationProvider>
                                            {formik.errors[item.name] ? (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "select" ? (
                                      <>
                                        <div
                                          className={` col-lg-${item.col_size}`}
                                        >
                                          <div className="input-block row mb-3">
                                            <label
                                              className={` col-lg-${item.label_size} card-text-Color`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              {item.iconText && (
                                                <span className="custom-tooltip-wrapper">
                                                  <span
                                                    className="info-icon-container"
                                                    data-tooltip={item.iconText}
                                                  >
                                                    <Info
                                                      style={{
                                                        width: "15px",
                                                        fill: "transparent",
                                                      }}
                                                      className="mx-1"
                                                    />
                                                  </span>
                                                </span>
                                              )}
                                            </label>
                                            <div>
                                              <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                disabled={item.disable}
                                                id={item.name}
                                                {...formik.getFieldProps(
                                                  item.name
                                                )}
                                              >
                                                <option value="">{`Select ${item.label}`}</option>
                                                {item.options.map(
                                                  (option, index) => (
                                                    <option
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                              {formik.touched[item.name] &&
                                              formik.errors[item.name] ? (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === "heading" ? (
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="row d-flex">
                                          <div className="col-lg-12">
                                            <div className="form-group input-block mt-3">
                                              <h5 style={{ fontWeight: 600 }}>
                                                {item.label}
                                              </h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 5 ? (
                      <div className="iq-card">
                        {field.label === "Time_Duration" && (
                          <>
                            <div className=" d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Time Duration</h4>
                              </div>
                            </div>
                            <div className="iq-card-body row dark-card">
                              {field.data.map((item, index) => (
                                <>
                                  {item.type === "text" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="input-block mb-3 flex-column">
                                        <label
                                          className={`col-lg-${item.label_size} card-text-Color`}
                                        >
                                          {item.label}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={`Enter ${item.label}`}
                                          readOnly={item.disable}
                                          id={item.name}
                                          autoComplete="new-password"
                                          name={item.name}
                                          value={formik.values[item.name] || ""}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                        />
                                        {formik.touched[item.name] &&
                                          formik.errors[item.name] && (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  ) : item.type === "timepiker" ? (
                                    <>
                                      <div
                                        className={`col-lg-${item.col_size}`}
                                      >
                                        <div className="input-block mb-3 flex-column">
                                          <label
                                            className={`col-lg-${item.label_size} card-text-Color`}
                                          >
                                            {item.label}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                          >
                                            <TimePicker
                                              className="ddddd"
                                              value={
                                                formik.values[item.name]
                                                  ? dayjs(
                                                      formik.values[item.name],
                                                      "HH:mm:ss"
                                                    )
                                                  : null
                                              }
                                              onChange={(newValue) => {
                                                formik.setFieldValue(
                                                  item.name,
                                                  newValue
                                                    ? newValue.format(
                                                        "HH:mm:ss"
                                                      )
                                                    : ""
                                                );
                                              }}
                                              minTime={minTime}
                                              views={[
                                                "hours",
                                                "minutes",
                                                "seconds",
                                              ]}
                                              ampm={false}
                                              renderInput={(params) => (
                                                <input
                                                  {...params.inputProps}
                                                  aria-describedby="basic-addon1"
                                                  className="form-control"
                                                  placeholder={`Enter ${item.label}`}
                                                  readOnly={item.disable}
                                                  id={item.name}
                                                  name={item.name}
                                                />
                                              )}
                                            />
                                          </LocalizationProvider>
                                          {formik.errors[item.name] ? (
                                            <div style={{ color: "red" }}>
                                              {formik.errors[item.name]}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </>
                                  ) : item.type === "text3" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="row d-flex">
                                        <div className="col-lg-12">
                                          <div className="form-group input-block mb-3">
                                            <label
                                              className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              <span className="text-danger ms-1">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="text"
                                              name={item.name}
                                              readOnly={item.disable}
                                              className="form-control"
                                              id={item.name}
                                              placeholder={`Enter ${item.label}`}
                                              value={
                                                formik.values[item.name] || ""
                                              }
                                              onChange={(e) => {
                                                let value = e.target.value;
                                                if (
                                                  /^\d*\.?\d*$/.test(value) &&
                                                  value.length <= 10
                                                ) {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    value
                                                  );
                                                }
                                              }}
                                              onBlur={formik.handleBlur}
                                            />
                                            {formik.touched[item.name] &&
                                              formik.errors[item.name] && (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : item.type === "select" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="input-block row mb-3">
                                        <label
                                          className={`col-lg-${item.label_size} card-text-Color`}
                                          htmlFor={item.name}
                                        >
                                          {item.label}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-lg-12">
                                          <select
                                            className="default-select wide form-control"
                                            disabled={item.disable}
                                            id={item.name}
                                            {...formik.getFieldProps(item.name)}
                                          >
                                            <option value="">{`Select ${item.label}`}</option>
                                            {item.options.map((option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </option>
                                            ))}
                                          </select>
                                          {formik.touched[item.name] &&
                                            formik.errors[item.name] && (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ) : item.type === "heading" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="row d-flex">
                                        <div className="col-lg-12">
                                          <div className="form-group input-block mt-3">
                                            <h5 style={{ fontWeight: 600 }}>
                                              {item.label}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field?.headingtype == 6 ? (
                      <div className="iq-card">
                        {field.label === "Other_Parameters" && (
                          <>
                            <div className=" d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Other Parameters</h4>
                              </div>
                            </div>
                            <div className="iq-card-body row dark-card">
                              {field.data.map((item, index) => (
                                <>
                                  {item.type === "text3" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="row d-flex">
                                        <div className="col-lg-12">
                                          <div className="form-group input-block mb-3">
                                            <label
                                              className={`col-lg-${item.label_size} card-text-Color d-flex align-items-center`}
                                              htmlFor={item.name}
                                            >
                                              {item.label}
                                              <span className="text-danger ms-1">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="text"
                                              name={item.name}
                                              readOnly={item.disable}
                                              className="form-control"
                                              id={item.name}
                                              placeholder={`Enter ${item.label}`}
                                              value={
                                                formik.values[item.name] || ""
                                              }
                                              onChange={(e) => {
                                                let value = e.target.value;
                                                if (
                                                  /^\d*\.?\d*$/.test(value) &&
                                                  value.length <= 10
                                                ) {
                                                  formik.setFieldValue(
                                                    item.name,
                                                    value
                                                  );
                                                }
                                              }}
                                              onBlur={formik.handleBlur}
                                            />
                                            {formik.touched[item.name] &&
                                              formik.errors[item.name] && (
                                                <div style={{ color: "red" }}>
                                                  {formik.errors[item.name]}
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : item.type === "select" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="input-block row mb-3">
                                        <label
                                          className={`col-lg-${item.label_size} card-text-Color`}
                                          htmlFor={item.name}
                                        >
                                          {item.label}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-lg-12">
                                          <select
                                            className="default-select wide form-control"
                                            disabled={item.disable}
                                            id={item.name}
                                            {...formik.getFieldProps(item.name)}
                                          >
                                            <option value="">{`Select ${item.label}`}</option>
                                            {item.options.map((option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </option>
                                            ))}
                                          </select>
                                          {formik.touched[item.name] &&
                                            formik.errors[item.name] && (
                                              <div style={{ color: "red" }}>
                                                {formik.errors[item.name]}
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ) : item.type === "heading" ? (
                                    <div className={`col-lg-${item.col_size}`}>
                                      <div className="row d-flex">
                                        <div className="col-lg-12">
                                          <div className="form-group input-block mt-3">
                                            <h5 style={{ fontWeight: 600 }}>
                                              {item.label}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : field.type === "text" ? (
                      <>
                        <div className={` col-lg-${field.col_size}`}>
                          <div className="input-block mb-3 flex-column">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color`}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>

                            {field.name == "username" ? (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Username"
                                id="username"
                                name="username"
                                autoComplete="new-password"
                                value={formik.values.username || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const regex = /^[a-zA-Z0-9]*$/;
                                  if (
                                    value === "" ||
                                    (regex.test(value) && value.length <= 20)
                                  ) {
                                    formik.setFieldValue("username", value);
                                  }
                                }}
                                onBlur={formik.handleBlur}
                                readOnly={false}
                              />
                            ) : field.name == "email" ? (
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                id="email"
                                name="email"
                                autoComplete="new-password"
                                value={formik.values.email || ""}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  value = value
                                    .replace(/\s/g, "")
                                    .toLowerCase();

                                  if (value.length <= 50) {
                                    formik.setFieldValue("email", value);
                                  }
                                }}
                                onBlur={formik.handleBlur}
                                readOnly={false}
                              />
                            ) : (
                              <input
                                type="text"
                                aria-describedby="basic-addon1"
                                className="form-control"
                                placeholder={`Enter ${field.label}`}
                                readOnly={field.disable}
                                id={field.name}
                                autoComplete="new-password"
                                name={field.name}
                                defaultValue={""}
                                value={formik.values[field.name] || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            )}
                            {formik.touched[field.name] &&
                            formik.errors[field.name] ? (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : field.type === "text5" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12 ">
                              <div className="form-group input-block mb-3">
                                <label
                                  className={`col-lg-${field.label_size} card-text-Color`}
                                  htmlFor={field.name}
                                >
                                  {field.label}
                                </label>
                                <span className="text-danger">*</span>
                                <input
                                  type="text"
                                  name={field.name}
                                  readOnly={field.disable}
                                  aria-describedby="basic-addon1"
                                  className="form-control"
                                  id={field.name}
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      value.length <= 10
                                    ) {
                                      value = value.replace(/^0+(?!\.)/, "");
                                      formik.setFieldValue(field.name, value);
                                    }
                                  }}
                                />
                                {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "text2" ? (
                      <>
                        <div className={` col-lg-${field.col_size}`}>
                          <div className="input-block mb-3 flex-column">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color`}
                            >
                              {field.label}
                            </label>

                            <input
                              type="text"
                              aria-describedby="basic-addon1"
                              className="form-control"
                              readOnly={field.disable}
                              id={field.name}
                              autoComplete="new-password"
                              name={field.name}
                              defaultValue={""}
                              value={formik.values[field.name] || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched[field.name] &&
                            formik.errors[field.name] ? (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : field.type === "file" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="profile-picture">
                            <div className="upload-profile">
                              <div className="profile-img">
                                <img
                                  id="blah"
                                  className="avatar"
                                  src={
                                    formik.values[field.name]
                                      ? formik.values[field.name]
                                      : "assets/img/profiles/avatar-14.jpg"
                                  }
                                  alt="profile-img"
                                />
                              </div>
                              <div className="add-profile">
                                <h5>Upload a Photo</h5>
                                <span>
                                  {selectedImage
                                    ? selectedImage.name
                                    : "Profile-pic.jpg"}
                                </span>
                              </div>
                            </div>
                            <div className="img-upload d-flex">
                              {/* Input field for selecting an image */}
                              <label className="btn btn-upload">
                                Upload{" "}
                                <input
                                  type="file"
                                  id={field.name}
                                  className="form-control"
                                  onChange={(e) =>
                                    handleFileChange(e, index, field.name)
                                  }
                                />
                              </label>
                              {/* Button to remove the selected image */}
                              {/* <button className="btn btn-remove" onClick={() => formik.setFieldValue(field.name, '')}>Remove</button> */}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "file1" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="mb-3">
                              <label
                                className={`col-form-${field.label_size} card-text-Color`}
                                htmlFor={field.name}
                              >
                                {field.label}
                              </label>
                              <input
                                type="file"
                                id={field.name}
                                onChange={(e) =>
                                  handleFileChange(e, index, field.name)
                                }
                                className={`form-control`}
                              />
                              {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "select" ? (
                      <>
                        <div className={` col-lg-${field.col_size}`}>
                          <div className="input-block row mb-3">
                            <label
                              className={` col-lg-${field.label_size} card-text-Color`}
                              htmlFor={field.name}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>
                            <div>
                              <select
                                className="default-select wide form-control"
                                aria-describedby="basic-addon1"
                                disabled={field.disable}
                                id={field.name}
                                {...formik.getFieldProps(field.name)}
                              >
                                {field.options
                                  .filter((option) =>
                                    field?.options1?.includes(option?.label)
                                  )
                                  .map((option, index) => (
                                    <option
                                      className="green"
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}

                                {/* Show non-filtered options (with the class 'black') next */}
                                {field.options
                                  .filter(
                                    (option) =>
                                      !field?.options1?.includes(option?.label)
                                  )
                                  .map((option, index) => (
                                    <option
                                      className="black"
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                              </select>

                              {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "select1" ? (
                      <>
                        <div className={` col-lg-${field.col_size}`}>
                          <div className="input-block row mb-3">
                            <label
                              className={` col-lg-${field.label_size} card-text-Color`}
                              htmlFor={field.name}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>
                            <div>
                              <select
                                className="default-select wide form-control"
                                aria-describedby="basic-addon1"
                                disabled={field.disable}
                                id={field.name}
                                {...formik.getFieldProps(field.name)}
                              >
                                <option value="">{`Select ${field.label}`}</option>
                                {field.options.map((option, index) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>

                              {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "select2" ? (
                      <>
                        <div className={` col-lg-12`}>
                          <div className="input-block row mb-3">
                            <label
                              className={` col-lg-${field.label_size} card-text-Color`}
                              htmlFor={field.name}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>

                            <div className="row">
                              <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="row d-flex justify-content-start">
                                  <div className="mb-4">
                                    <div className="form-check custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={field.name}
                                        {...formik.getFieldProps(field.name)}
                                        checked={
                                          formik.values[field.name]?.length ===
                                          field.options.length
                                        } // Check if all options are selected
                                        onChange={() => {
                                          if (
                                            formik.values[field.name]
                                              ?.length === field.options.length
                                          ) {
                                            formik.setFieldValue(
                                              field.name,
                                              []
                                            ); // Uncheck all
                                          } else {
                                            formik.setFieldValue(
                                              field.name,
                                              field.options.map(
                                                (option) => option.value
                                              )
                                            ); // Check all
                                          }
                                        }}
                                      />
                                      <label
                                        className="form-check-label card-text-Color"
                                        htmlFor={field.name}
                                      >
                                        Select All
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {field.options.map((opData) => (
                                <div
                                  className="col-lg-3 col-md-4 col-sm-6"
                                  key={opData.value}
                                >
                                  <div className="row d-flex justify-content-start">
                                    <div className="mb-4">
                                      <div className="form-check custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={opData.label}
                                          {...formik.getFieldProps(field.name)}
                                          checked={formik.values[
                                            field.name
                                          ]?.includes(opData.value)}
                                          onChange={() => {
                                            const selectedBrokers = [
                                              ...formik.values[field.name],
                                            ];
                                            if (
                                              selectedBrokers.includes(
                                                opData.value
                                              )
                                            ) {
                                              formik.setFieldValue(
                                                field.name,
                                                selectedBrokers.filter(
                                                  (value) =>
                                                    value !== opData.value
                                                )
                                              );
                                            } else {
                                              formik.setFieldValue(field.name, [
                                                ...selectedBrokers,
                                                opData.value,
                                              ]);
                                            }
                                          }}
                                        />
                                        <label
                                          className="form-check-label card-text-Color"
                                          htmlFor={opData.label}
                                        >
                                          {opData.label}
                                        </label>
                                      </div>
                                      {formik.errors[field.name] && (
                                        <div style={{ color: "red" }}>
                                          {formik.errors[field.name]}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "checkbox" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex justify-content-start">
                            <div className="mb-4">
                              <div className="form-check custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={field.label}
                                  {...formik.getFieldProps(field.name)}
                                  checked={formik.values[field.name]}
                                  onChange={() => {
                                    formik.setFieldValue(
                                      field.name,
                                      !formik.values[field.name]
                                    );
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={field.label}
                                >
                                  {field.label}
                                </label>
                              </div>
                              {formik.errors[field.name] && (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "radio" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          {/* <label
                                        className={`col-lg-${field.label_size} col-form-label fw-bold text-decoration-underline`}
                                        htmlFor={field.parent_label}
                                      >
                                        {field.parent_label}
                                      </label> */}

                          <div
                            className={`d-flex mb-4 col-lg-${field.col_size}`}
                          >
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox d-flex align-items-center`}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value1}
                                className="form-check-input"
                                id={field.title1}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} card-text-Color col-form-label mx-2`}
                                htmlFor={field.title1}
                              >
                                {field.title1}
                              </label>
                            </div>
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox d-flex align-items-center`}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value2}
                                className="form-check-input"
                                id={field.title2}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} card-text-Color col-form-label  mx-2`}
                                htmlFor={field.title2}
                              >
                                {field.title2}
                              </label>
                            </div>
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox d-flex align-items-center`}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value3}
                                className="form-check-input"
                                id={field.title3}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} card-text-Color col-form-label  mx-2`}
                                htmlFor={field.title3}
                              >
                                {field.title3}
                              </label>
                            </div>
                            <div
                              className={`col-lg-${field.col_size} form-check custom-checkbox d-flex align-items-center `}
                            >
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value4}
                                className="form-check-input"
                                id={field.title4}
                                {...formik.getFieldProps(field.name)}
                              />
                              <label
                                className={`col-lg-${field.label_size} card-text-Color col-form-label  mx-2`}
                                htmlFor={field.title4}
                              >
                                {field.title4}
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "textType" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12 ">
                              <div className="form-group input-block mt-3">
                                <h5 htmlFor={field.name}>{field.label}</h5>
                                {/* <h2 htmlFor={field.name}>
                                                {field.name}
                                              </h2> */}
                                {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "timepiker" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="input-block mb-3 flex-column">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color`}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                className="ddddd"
                                value={
                                  formik.values[field.name]
                                    ? dayjs(
                                        formik.values[field.name],
                                        "HH:mm:ss"
                                      )
                                    : null
                                }
                                onChange={(newValue) => {
                                  formik.setFieldValue(
                                    field.name,
                                    newValue ? newValue.format("HH:mm:ss") : ""
                                  );
                                }}
                                minTime={minTime}
                                views={["hours", "minutes", "seconds"]}
                                ampm={false}
                                renderInput={(params) => (
                                  <input
                                    {...params.inputProps}
                                    aria-describedby="basic-addon1"
                                    className="form-control"
                                    placeholder={`Enter ${field.label}`}
                                    readOnly={field.disable}
                                    id={field.name}
                                    name={field.name}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                            {formik.errors[field.name] ? (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : field.type === "radio1" ? (
                      <>
                        <div className={` col-lg-${field.col_size} mt-4`}>
                          <div className="d-flex">
                            {field.title &&
                              field.title.map((item) => (
                                <div
                                  className={`form-check custom-checkbox d-flex align-items-center col-lg-3`}
                                  key={item.title}
                                >
                                  <input
                                    type="radio"
                                    name={field.name}
                                    value={item.value}
                                    className="form-check-input"
                                    id={item.title}
                                    onChange={formik.handleChange}
                                    checked={
                                      formik.values[field.name] === item.value
                                    }
                                  />
                                  <label
                                    className={`col-lg-${field.label_size} card-text-Color col-form-label mx-2`}
                                    htmlFor={item.title}
                                  >
                                    {item.title}

                                    {item?.iconText && (
                                      <span className="custom-tooltip-wrapper">
                                        <span
                                          className="info-icon-container"
                                          data-tooltip={item?.iconText}
                                        >
                                          <Info
                                            style={{
                                              width: "15px",
                                              fill: "transparent",
                                            }}
                                            className="mx-1"
                                          />
                                        </span>
                                      </span>
                                    )}
                                  </label>
                                </div>
                              ))}
                          </div>
                          {formik.touched[field.name] &&
                          formik.errors[field.name] ? (
                            <div style={{ color: "red" }}>
                              {formik.errors[field.name]}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : field.type === "radio2" ? (
                      <>
                        <div className={`col-lg-${field.col_size} mt-2`}>
                          {field.title && (
                            <>
                              {Array.from({
                                length: Math.ceil(field.title.length / 3),
                              }).map((_, groupIndex) => (
                                <div
                                  className="d-flex flex-wrap mb-2"
                                  key={groupIndex}
                                >
                                  {field.title
                                    .slice(groupIndex * 3, groupIndex * 3 + 3)
                                    .map((item) => (
                                      <div
                                        className="form-check custom-checkbox d-flex align-items-center col-lg-4"
                                        key={item.title}
                                      >
                                        <input
                                          type="radio"
                                          name={field.name}
                                          value={item.value}
                                          className="form-check-input"
                                          id={item.title}
                                          onChange={formik.handleChange}
                                          checked={
                                            formik.values[field.name] ===
                                            item.value
                                          }
                                        />
                                        <label
                                          className={`col-lg-${field.label_size} card-text-Color col-form-label mx-2`}
                                          htmlFor={item.title}
                                        >
                                          {item.title}
                                          {item.iconText && (
                                            <span className="custom-tooltip-wrapper">
                                              <span
                                                className="info-icon-container"
                                                data-tooltip={item.iconText}
                                              >
                                                <Info
                                                  style={{
                                                    width: "15px",
                                                    fill: "transparent",
                                                  }}
                                                  className="mx-1"
                                                />
                                              </span>
                                            </span>
                                          )}
                                        </label>
                                      </div>
                                    ))}
                                </div>
                              ))}
                            </>
                          )}
                          {formik.touched[field.name] &&
                          formik.errors[field.name] ? (
                            <div style={{ color: "red" }}>
                              {formik.errors[field.name]}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : field.type === "radio2" ? (
                      <>
                        <div
                          className={`d-flex justify-content-center mb-4 col-lg-${field.col_size}`}
                        >
                          {field.title &&
                            field.title.map((item) => (
                              <div
                                className={`form-check custom-checkbox d-flex align-items-center col-lg-3`}
                                key={item.title}
                              >
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={item.value}
                                  className="form-check-input"
                                  id={item.title}
                                  onChange={formik.handleChange}
                                  checked={
                                    formik.values[field.name] === item.value
                                  }
                                />
                                <label
                                  className={`col-lg-${field.label_size} card-text-Color col-form-label mx-2`}
                                  htmlFor={item.title}
                                >
                                  {item.title}
                                  {item.iconText && (
                                    <span className="custom-tooltip-wrapper">
                                      <span
                                        className="info-icon-container"
                                        data-tooltip={item.iconText}
                                      >
                                        <Info
                                          style={{
                                            width: "15px",
                                            fill: "transparent",
                                          }}
                                          className="mx-1"
                                        />
                                      </span>
                                    </span>
                                  )}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    ) : field.type === "password" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className=" input-block row mb-3">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color  col-form-labelp-0 `}
                              htmlFor={field.name}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>
                            <div style={{ position: "relative" }}>
                              <input
                                id={field.name}
                                type={
                                  passwordVisible[field.name]
                                    ? "text"
                                    : field.type
                                }
                                value={formik.values[field.name] || ""}
                                placeholder={`Enter ${field.label}`}
                                {...formik.getFieldProps(field.name)}
                                className={` form-control`}
                              />
                              <i
                                className={`fa-solid card-text-Color ${
                                  passwordVisible[field.name]
                                    ? "ri-eye-off-line password-eye"
                                    : "ri-eye-line password-eye"
                                }`}
                                style={{
                                  position: "absolute",
                                  top: "1.5px",
                                  right: "20px",
                                  padding: "12.4px 6.6px",
                                  borderRadius: "3px",
                                }}
                                onClick={() =>
                                  setPasswordVisible((prevState) => ({
                                    ...prevState,
                                    [field.name]: !prevState[field.name],
                                  }))
                                }
                              ></i>
                              {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "password1" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className=" input-block row">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color col-form-labelp-0 `}
                              htmlFor={field.name}
                            >
                              {field.label}
                              <span className="text-danger">*</span>
                            </label>
                            <div style={{ position: "relative" }}>
                              <input
                                id={field.name}
                                type={
                                  passwordVisible[field.name]
                                    ? "text"
                                    : field.type
                                }
                                value={formik.values[field.name] || ""}
                                placeholder={`Enter ${field.label}`}
                                {...formik.getFieldProps(field.name)}
                                className={` form-control`}
                              />

                              {formik.touched[field.name] &&
                              formik.errors[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "date" ? (
                      <>
                        <div className="col-lg-3">
                          <div className="row d-flex">
                            <div className="col-lg-12 ">
                              <div className="form-check custom-checkbox input-block p-0">
                                <label
                                  className="col-lg-6 card-text-Color"
                                  htmlFor={field.label}
                                >
                                  {field.label}
                                </label>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  className="form-control"
                                  id={field.name}
                                  readOnly={field.disable}
                                  {...formik.getFieldProps(field.name)}
                                />
                              </div>
                              {formik.errors[field.name] && (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "msgbox" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="mb-3 input-block">
                              <label
                                className={`col-lg-${field.label_size} card-text-Color`}
                                htmlFor={field.name}
                              >
                                {field.label}
                              </label>
                              <textarea
                                className="form-control"
                                rows={field.row_size}
                                id={field.name}
                                name={field.name}
                                {...formik.getFieldProps(field.name)}
                                placeholder={field.label}
                              ></textarea>
                              {formik.touched[field.name] &&
                                formik.errors[field.name] && (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "number" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12 ">
                              <div className="form-group input-block mb-3">
                                <label
                                  className={`col-lg-${field.label_size} card-text-Color`}
                                  htmlFor={field.name}
                                >
                                  {field.label}
                                </label>
                                <span className="text-danger">*</span>

                                <input
                                  type="number"
                                  name={field.name}
                                  aria-describedby="basic-addon1"
                                  className="form-control"
                                  id={field.name}
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                />

                                {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "security" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="input-block mb-3 flex-column">
                            <label
                              className={`col-lg-${field.label_size} card-text-Color`}
                            >
                              {field.label}
                            </label>
                          </div>
                        </div>
                      </>
                    ) : field.type === "text3" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12">
                              <div className="form-group input-block mb-3">
                                <label
                                  className={`col-lg-${field.label_size} card-text-Color d-flex align-items-center`}
                                  htmlFor={field.name}
                                >
                                  {field.label}
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <input
                                  type="text"
                                  name={field.name}
                                  readOnly={field.disable}
                                  aria-describedby="basic-addon1"
                                  className="form-control"
                                  id={field.name}
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      value.length <= 10
                                    ) {
                                      formik.setFieldValue(field.name, value);
                                    }
                                  }}
                                />
                                {formik.touched[field.name] &&
                                formik.errors[field.name] ? (
                                  <div style={{ color: "red" }}>
                                    {formik.errors[field.name]}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "text4" ? (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12">
                              <div className="form-group input-block mb-3">
                                <label
                                  htmlFor={field.name}
                                  className={`col-lg-${field.label_size} card-text-Color d-flex align-items-center gap-1`}
                                >
                                  <span>{field.label}</span>
                                  <span className="text-danger">*</span>
                                </label>

                                <input
                                  type="number"
                                  name={field.name}
                                  readOnly={field.disable}
                                  aria-describedby="basic-addon1"
                                  className="form-control"
                                  id={field.name}
                                  placeholder={`Enter ${field.label}`}
                                  {...formik.getFieldProps(field.name)}
                                  min={1}
                                  step="any"
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/^0+(?!\.)/, "");
                                    if (value !== "") {
                                      value = Math.min(
                                        Math.max(parseFloat(value), 1),
                                        100
                                      );
                                    }
                                    formik.setFieldValue(field.name, value);
                                  }}
                                />

                                {formik.touched[field.name] &&
                                  formik.errors[field.name] && (
                                    <div style={{ color: "red" }}>
                                      {formik.errors[field.name]}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "heading" ? (
                      <>
                        <div></div>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="row d-flex">
                            <div className="col-lg-12">
                              <div className="form-group input-block mt-3">
                                <h5 style={{ fontWeight: 600 }}>
                                  {field.label}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : field.type === "multiselect" ? (
                      <div className={`col-lg-${field.col_size}`}>
                        <div
                          className="input-block mb-3 flex-column"
                          id="multiSelectIdTest"
                        >
                          <label
                            className={`col-lg-${field.label_size} card-text-Color mb-1`}
                          >
                            {field.label}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            id="multiSelection"
                            options={field.options}
                            isMulti
                            className="basic-multi-select"
                            value={formik.values[field.name]} // Bind to Formik's values
                            onChange={
                              (selected) =>
                                formik.setFieldValue(field.name, selected) // Use Formik's setFieldValue
                            }
                            placeholder={
                              field.placeholder
                                ? field.placeholder
                                : "Select options"
                            }
                            isDisabled={field.disable}
                          />
                          {formik.touched[field.name] &&
                            formik.errors[field.name] && (
                              <div style={{ color: "red" }}>
                                {formik.errors[field.name]}
                              </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`col-lg-${field.col_size}`}>
                          <div className="input-block mb-3"></div>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
                {additional_field}
                <div className="add-customer-btns text-end mt-3 ">
                  {btn_name1 ? (
                    <Link
                      to={btn_name1_route}
                      className="btn customer-btn-cancel mx-3  cancel-btn-color"
                    >
                      {btn_name1}
                    </Link>
                  ) : (
                    ""
                  )}
                  {
                    <>
                      <button
                        type="submit"
                        className="btn customer-btn-save add-btn-color"
                      >
                        {btn_name}
                      </button>
                      {btn_name2 ? (
                        <button
                          type="submit"
                          className="btn customer-btn-save btn-primary"
                        >
                          {btn_name2}
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default DynamicForm;
