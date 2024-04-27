import { CiSearch, CiFilter } from "react-icons/ci";

interface IFormProps {
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}


function FormSearch({onSubmit}: IFormProps) {
	return (
		<form className="form-search" onSubmit={onSubmit}>
			<input type="text" className="field-search" placeholder="Search" name="search" />
			<button type="submit" className="btn btn-search">
                <i><CiSearch /></i>
            </button>
		</form>
	);
}


export { FormSearch }
