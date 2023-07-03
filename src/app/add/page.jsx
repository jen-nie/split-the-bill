"use client";
import { supabase } from "../../../lib/supabaseClient";
import { Form, Formik } from "formik";

export default async function Page() {
  let { data: groups, groupsError } = await supabase.from("groups").select();

  let { data: userInGroup, userInGrouperror } = await supabase
    .from("userInGroup")
    .select(
      `"*",
    users(username, userId)
  `
    )
    .eq("groupId", groups[0].groupId);
  console.log(userInGroup);

  function toggleField(user) {
    // Get the checkbox
    let checkBox = document.getElementById("equal_check_" + user);
    // Get the output text
    let textField = document.getElementById("portion_" + user);

    // If the checkbox is checked, display the output text
    if (checkBox.checked) {
      textField.removeAttribute("disabled");
    } else {
      textField.setAttribute("disabled", "disabled");
    }
  }

  function toggleUser(user) {
    // Get the checkbox
    let checkBox = document.getElementById("check_" + user);

    if (checkBox.checked) {
      // If the user checkbox is checked, uncheck the "split the bill" checkbox
      document.getElementById("equal_check_" + user).checked = false;
      toggleField(user);
    } else {
      // If the user checkbox is unchecked, check the "split the bill" checkbox
      document.getElementById("equal_check_" + user).checked = true;
      document.getElementById("portion_" + user).setAttribute("disabled", "disabled");
    }
  }

  return (
    <main>
      <h2>{groups[0].groupname}</h2>
      <div className="overlay">
        <Formik>
          <Form></Form>
        </Formik>
        <form>
          <ul className="two-row-list flex-list-parent">
            <li>
              <label htmlFor="title">Title </label>
              <span className="flex-right">
                <input type="text" name="title" id="title" />
              </span>
            </li>
            <li>
              {" "}
              Who paid?{" "}
              <span className="flex-right">
                <select name="payer">
                  <option selected="selected" hidden="">
                    - Select User -
                  </option>
                  {userInGroup?.map((user) => (
                    <option value={user.users.userId}>{user.users.username}</option>
                  ))}
                </select>
              </span>
            </li>
            <li>
              <label htmlFor="total">Total </label>
              <span className="flex-right">
                <input type="number" step=".01" name="total" className="number-field" />€
              </span>
            </li>

            {userInGroup?.map((user) => (
              <li>
                <span>
                  <input type="checkbox" name={`check_${user.users.userId}`} id={`check_${user.users.userId}`} checked="checked" onClick={() => toggleUser(user.users.userId)} />
                  <label htmlFor={`check_${user.users.userId}`}>{user.users.username} </label>
                </span>
                <span></span>
                <span>
                  <input type="number" step=".01" name={`portion_${user.users.userId}`} id={`portion_${user.users.userId}`} value="0" className="number-field" />€
                </span>
                <span className="flex-right">
                  {" "}
                  or <input type="checkbox" name={`equal_check_${user.users.userId}`} id={`equal_check_${user.users.userId}`} onClick={() => toggleField(user.users.userId)} />
                  <label htmlFor={`equal_check_${user.users.userId}`}> split the rest</label>
                </span>
              </li>
            ))}
            <li>
              <label htmlFor="comment">Comment: </label>
              <textarea name="comment" />
            </li>
          </ul>
          <input type="hidden" name="groupId" value={groups[0].groupId} />
          <p className="center-ui">
            <input type="submit" value="Add" name="create" className="button" />
          </p>
        </form>
      </div>
    </main>
  );
}
