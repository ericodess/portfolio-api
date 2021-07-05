//Styled
import { LoaderWrapper, LoaderCircle } from "./styles";

const Loader = () => {
	return(
		<LoaderWrapper className="--flex-row --flex-centered-items">
			<LoaderCircle delay={-1.2} />
			<LoaderCircle delay={-1} />
			<LoaderCircle delay={-0.8} />
		</LoaderWrapper>
	);
};

export default Loader;