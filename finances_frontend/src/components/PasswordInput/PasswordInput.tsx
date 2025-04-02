import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.scss";

const PasswordInput = ({classnames, id}: {classnames: string | undefined, id:string}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        type={isPasswordVisible ? "text" : "password"}
		id={id}
		name={id}
		min={8}
		required
		className={classnames}
      />
      <button
        type="button"
        className="toggle-visibility"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
