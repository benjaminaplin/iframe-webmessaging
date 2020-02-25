import { v4 } from "uuid";
const epicAuthResponse = {
  messageId: v4(),
  token: `token-${v4()}`
};

const orderSubmitSuccessResponse = {
  messageId: v4(),
  actionExecuted: true
};
const orderSubmitFailureResponse = {
  messageId: v4(),
  actionExecuted: false
};

const handleResponse = event => {
  if (
    !event.data ||
    (event.data.source && event.data.source.includes("react")) ||
    (event.data.source && event.data.source.includes("@devtools"))
  ) {
    return;
  }
  console.log("parent window handleResponse", event.data);

  if (event.data.action === "Epic.Clinical.Informatics.Web.InitiateHandshake") {
    event.source.postMessage(epicAuthResponse, "*");
  }

  if (event.data.action === "Epic.Clinical.Informatics.Web.PostOrder") {
    event.source.postMessage(orderSubmitSuccessResponse, "*");
  }
};

export default handleResponse;
