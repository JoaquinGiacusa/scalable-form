import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

const slides = [
  {
    id: 1,
    title: "slide hardcoded 1",
    url_image:
      "https://cdn.pixabay.com/photo/2015/12/06/09/15/maple-1079235_1280.jpg",
    url_destination:
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
    order: 1,
  },
  {
    id: 2,
    title: "slide hardcoded 2",
    url_image:
      "https://cdn.pixabay.com/photo/2016/09/22/10/44/banner-1686943_1280.jpg",
    url_destination:
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
    order: 2,
  },
  {
    id: 3,
    title: "slide hardcoded 3",
    url_image:
      "https://cdn.pixabay.com/photo/2017/10/03/17/53/nature-2813487_1280.jpg",
    url_destination:
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
    order: 3,
  },
];

type InputProps = {
  label: string;
  type: string;
  name: string;
  isRequired?: boolean;
  selectValue?: number[] | string[];
};

const InputBasic: React.FC<InputProps> = ({
  label,
  type,
  name,
  isRequired,
  selectValue,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const isError = Boolean(errors[name]?.message);
  const isText = type == "text" || type == "email" || type == "password";

  return (
    <FormControl fullWidth>
      <InputLabel
        error={isError}
        htmlFor={name}
        shrink={type == "date" ? true : undefined}
      >
        {label}
      </InputLabel>

      {isText && (
        <OutlinedInput
          {...register(name, {
            required: {
              value: isRequired || false,
              message: "This field is required",
            },
          })}
          type={showPassword ? "text" : type}
          error={isError}
          id={name}
          label={label}
          endAdornment={
            type == "password" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <>Show</> : <>Not Show</>}
                </IconButton>
              </InputAdornment>
            )
          }
        />
      )}
      {selectValue && (
        <Select
          labelId={name}
          id={name}
          defaultValue={selectValue[0]}
          label={label}
          {...register(name, {
            required: {
              value: isRequired || false,
              message: "This field is required",
            },
          })}
        >
          {selectValue?.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      )}
      {type == "date" && (
        <OutlinedInput
          {...register(name, {
            required: {
              value: isRequired || false,
              message: "This field is required",
            },
          })}
          type={type}
          error={isError}
          id={name}
          notched
          label={label}
        />
      )}
      <FormHelperText
        error={isError}
        id={name}
        children={isError ? String(errors[name]?.message) : " "}
      ></FormHelperText>
    </FormControl>
  );
};

type FormProps = {
  formArray: InputProps[][];
  onSubmit: SubmitHandler<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }>;
};

const Form: React.FC<FormProps> = ({ formArray, onSubmit }) => {
  const methods = useForm<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }>();

  return (
    <FormProvider {...methods}>
      <Box
        component={"form"}
        action="submit"
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {formArray.map((row, index) => (
          <Stack
            key={index + 100}
            spacing={2}
            direction={"row"}
            sx={{ widows: "100%" }}
          >
            {row.map((i, index) => {
              return (
                <InputBasic
                  key={index}
                  label={i.label}
                  type={i.type}
                  name={i.name}
                  isRequired={i.isRequired}
                  selectValue={i.selectValue}
                />
              );
            })}
          </Stack>
        ))}

        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Box>
    </FormProvider>
  );
};

const options: InputProps[][] = [
  [
    { label: "FirstName", type: "text", name: "firstName" },
    { label: "LastName", type: "text", name: "lastName" },
  ],
  [{ label: "Email", type: "text", name: "email", isRequired: true }],
  [{ label: "Password", type: "password", name: "password" }],
  [
    {
      label: "Order",
      type: "select",
      name: "order",
      selectValue: ["Admin", "User"],
    },
  ],
  [
    {
      label: "BirthDate",
      name: "birthdate",
      type: "date",
    },
  ],
];

export default function Home() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <>
      <Form formArray={options} onSubmit={onSubmit} />
    </>
  );
}
