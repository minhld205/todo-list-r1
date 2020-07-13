import Button from "@material-ui/core/Button";

export const ButtonUI = ({ children, ...args }) => {
  return (
    <Button type="button" {...args}>
      {children}
    </Button>
  );
};
