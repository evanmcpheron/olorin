import { forwardRef } from 'react';
import OlorinHighlight from '@olorin/core/OlorinHighlight';

type HighlightedCodeProps = {
	code: string;
	language: string;
};
const HighlightedCode = forwardRef<HTMLDivElement, HighlightedCodeProps>((props, ref) => {
	const { code, language, ...other } = props;

	return (
		<OlorinHighlight
			component="pre"
			className={`language-${language || 'jsx'}`}
			ref={ref}
			{...other}
		>
			{code}
		</OlorinHighlight>
	);
});

export default HighlightedCode;
