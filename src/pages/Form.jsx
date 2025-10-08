import MuiSelect from "../components/MuiSelect";
import MuiInput from "../components/MuiInput";
import MuiBtns from "../components/MuiBtns";
import RadioBtn from "../components/MuiRadioBtn";
import CheckBox from "../components/MuiFormCheckBox";
import CardInfo from "../components/MuiCardHeader";

export default function Form() {
    return (
        <>
        <CardInfo />
      <br />

      <br />
      <CheckBox
        TypoVariant="h4"
        lable="I agree to the terms and conditions"
        CheckValues={["Agree", "Disagree"]}
        number="1."
        content="I agree to the terms and conditions"
      />
      <RadioBtn
        TypoVariant="h4"
        lable="Evaluate from 1 to 5 where 1 is worst and 5 is best"
        ChooseValues={["1", "2", "3", "4", "5"]}
        number="2."
        content={
          "I evaluate from 1 to 5" + "? (" + "where 1 is worst and 5 is best)"
        }
      />
      <MuiInput TypoVariant="h4" number="3." content="What is your favorite color" /> 
      {/* <MuiSelect TypoVariant="h4" number="4." content="Select the next Month scehdule" Months={["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} /> */}
      <br />
      <br />
      <br />
      <br />
      <MuiBtns />
        </>
    );
}