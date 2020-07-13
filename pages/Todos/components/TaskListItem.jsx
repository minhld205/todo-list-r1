import Icon from "@material-ui/core/Icon";
import { ButtonUI } from "./common/Button";
import { STATUS, STATUS_NAME } from "../constants";

const icons = {
  [STATUS.START]: "assignment",
  [STATUS.IN_PROGRESS]: "autorenew",
  [STATUS.DONE]: "assignment_turned_in",
  [STATUS.DELETED]: "delete",
  [STATUS.CANCELED]: "cancel",
};

const colors = {
  [STATUS.START]: "grey",
  [STATUS.IN_PROGRESS]: "blue",
  [STATUS.DONE]: "green",
  [STATUS.DELETED]: "red",
  [STATUS.CANCELED]: "black",
};

const IconTodo = ({ status }) => {
  return (
    <Icon style={{ color: colors[status], margin: "auto 4px auto 0px" }}>
      {icons[status]}
    </Icon>
  );
};

const Actions = ({ status, onClick }) => {
  let render = null;
  switch (status) {
    case STATUS.START:
      render = (
        <>
          <ButtonUI color="primary" onClick={() => onClick(STATUS.START)}>
            Start
          </ButtonUI>
          <ButtonUI onClick={() => onClick(STATUS.DELETED)}>Delete</ButtonUI>
        </>
      );
      break;
    case STATUS.IN_PROGRESS:
      render = (
        <>
          <ButtonUI
            color="secondary"
            onClick={() => onClick(STATUS.IN_PROGRESS)}
          >
            Done
          </ButtonUI>
          <ButtonUI onClick={() => onClick(STATUS.CANCELED)}>Cancel</ButtonUI>
        </>
      );
      break;
    case STATUS.DONE:
      render = (
        <>
          {/* <ButtonUI color="primary" onClick={() => onClick(status)}>
            Start
          </ButtonUI> */}
          <ButtonUI onClick={() => onClick(STATUS.DELETED)}>Delete</ButtonUI>
        </>
      );
      break;
    case STATUS.CANCELED:
      render = (
        <>
          <ButtonUI color="primary" onClick={() => onClick(STATUS.DELETED)}>
            Delete
          </ButtonUI>
        </>
      );
      break;
    case STATUS.DELETED:
      render = (
        <>
          <ButtonUI color="primary" onClick={() => onClick(status)}>
            Start
          </ButtonUI>
          <ButtonUI onClick={() => onClick(STATUS.CANCELED)}>Cancel</ButtonUI>
        </>
      );
      break;
    default:
      break;
  }
  return render;
};

export default ({ children, item, onChange }) => {
  const { status, id } = item;
  const handleOnClick = (status) => {
    onChange && onChange({ status, id });
  };

  return (
    <>
      <li id={id} className="task-list__item">
        <IconTodo status={status} />
        <p
          className={`title ${
            (status === STATUS.DONE || status === STATUS.CANCELED) &&
            `item-stop`
          }`}
        >
          {`[${STATUS_NAME[status]}] ${children}`}
        </p>
        <div className="btn-group">
          <Actions status={status} onClick={handleOnClick} />
        </div>
      </li>
      <style jsx>{`
        .task-list__item {
          padding: 4px 8px;
          margin: 2px 0px;
          display: flex;
          background: #fff;
        }
        .title {
          flex: 1;
          margin: auto 0;
        }
        .item-stop {
          text-decoration: line-through;
        }
        .btn-group {
          display: flex;
        }
      `}</style>
    </>
  );
};
