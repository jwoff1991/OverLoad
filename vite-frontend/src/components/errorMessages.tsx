import { ErrorsType } from "../typeDeclerations";

export const ErrorMessages = ({ errors }: { errors: ErrorsType }) => (
  <>
    {Object.values(errors).map((error, index) =>
      error ? (
        <div key={index} className="error-message">
          {error}
        </div>
      ) : null
    )}
  </>
);
