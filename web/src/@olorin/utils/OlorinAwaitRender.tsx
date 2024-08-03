import { useEffect, useState } from 'react';

type OlorinAwaitRenderProps = {
	delay?: number;
	children: React.ReactNode;
};

function OlorinAwaitRender(props: OlorinAwaitRenderProps) {
	const { delay = 0, children } = props;
	const [awaitRender, setAwaitRender] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAwaitRender(false);
		}, delay);
	}, [delay]);

	return awaitRender ? null : children;
}

export default OlorinAwaitRender;
