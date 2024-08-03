import OlorinScrollbars from '@olorin/core/OlorinScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, ReactNode, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system';
import OlorinPageSimpleHeader from './OlorinPageSimpleHeader';
import OlorinPageSimpleSidebar from './OlorinPageSimpleSidebar';

const headerHeight = 120;
const toolbarHeight = 64;

/**
 * Props for the OlorinPageSimple component.
 */
type OlorinPageSimpleProps = SystemStyleObject<Theme> & {
	className?: string;
	leftSidebarContent?: ReactNode;
	leftSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	rightSidebarContent?: ReactNode;
	rightSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	header?: ReactNode;
	content?: ReactNode;
	scroll?: 'normal' | 'page' | 'content';
	leftSidebarOpen?: boolean;
	rightSidebarOpen?: boolean;
	leftSidebarWidth?: number;
	rightSidebarWidth?: number;
	rightSidebarOnClose?: () => void;
	leftSidebarOnClose?: () => void;
};

/**
 * The Root styled component is the top-level container for the OlorinPageSimple component.
 */
const Root = styled('div')<OlorinPageSimpleProps>(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: 'auto',
	backgroundColor: theme.palette.background.default,

	'&.OlorinPageSimple-scroll-content': {
		height: '100%',
	},

	'& .OlorinPageSimple-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default,

		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden',
		}),
	},

	'& .OlorinPageSimple-header': {
		display: 'flex',
		flex: '0 0 auto',
		backgroundSize: 'cover',
	},

	'& .OlorinPageSimple-topBg': {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		pointerEvents: 'none',
	},

	'& .OlorinPageSimple-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1 1 auto',
		overflow: 'hidden',

		//    WebkitOverflowScrolling: 'touch',
		zIndex: 9999,
	},

	'& .OlorinPageSimple-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center',
	},

	'& .OlorinPageSimple-content': {
		display: 'flex',
		flex: '1 1 auto',
		alignItems: 'start',
		minHeight: 0,
		overflowY: 'auto',
	},

	'& .OlorinPageSimple-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),

					'&.OlorinPageSimple-leftSidebar': {
						marginLeft: -props.leftSidebarWidth,
					},
					'&.OlorinPageSimple-rightSidebar': {
						marginRight: -props.rightSidebarWidth,
					},
				},
			},
		},
	},

	'& .OlorinPageSimple-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,

		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
			},
		},
		maxWidth: '100%',
		height: '100%',
	},

	'& .OlorinPageSimple-leftSidebar': {
		width: props.leftSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: 0,
		},
	},

	'& .OlorinPageSimple-rightSidebar': {
		width: props.rightSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			borderLeft: `1px solid ${theme.palette.divider}`,
			borderRight: 0,
		},
	},

	'& .OlorinPageSimple-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText,
	},

	'& .OlorinPageSimple-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto',
	},

	'& .OlorinPageSimple-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%',
	},

	'& .OlorinPageSimple-backdrop': {
		position: 'absolute',
	},
}));

/**
 * The OlorinPageSimple component is a layout component that provides a simple page layout with a header, left sidebar, right sidebar, and content area.
 * It is designed to be used as a top-level component for an application or as a sub-component within a larger layout.
 */
const OlorinPageSimple = forwardRef<
	{ toggleLeftSidebar:(T: boolean) => void; toggleRightSidebar: (T: boolean) => void },
	OlorinPageSimpleProps
>((props, ref) => {
	const {
		scroll = 'page',
		className,
		header,
		content,
		leftSidebarContent,
		rightSidebarContent,
		leftSidebarOpen = false,
		rightSidebarOpen = false,
		rightSidebarWidth = 240,
		leftSidebarWidth = 240,
		leftSidebarVariant = 'permanent',
		rightSidebarVariant = 'permanent',
		rightSidebarOnClose,
		leftSidebarOnClose,
	} = props;

	const leftSidebarRef = useRef<{ toggleSidebar:(T: boolean) => void }>(null);
	const rightSidebarRef = useRef<{ toggleSidebar:(T: boolean) => void }>(null);
	const rootRef = useRef(null);

	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: (val: boolean) => {
			leftSidebarRef?.current?.toggleSidebar(val);
		},
		toggleRightSidebar: (val: boolean) => {
			rightSidebarRef?.current?.toggleSidebar(val);
		},
	}));

	return (
		<>
			<GlobalStyles
				styles={() => ({
					...(scroll !== 'page' && {
						'#olorin-toolbar': {
							position: 'static',
						},
						'#olorin-footer': {
							position: 'static',
						},
					}),
					...(scroll === 'page' && {
						'#olorin-toolbar': {
							position: 'sticky',
							top: 0,
						},
						'#olorin-footer': {
							position: 'sticky',
							bottom: 0,
						},
					}),
				})}
			/>
			<Root
				className={clsx('OlorinPageSimple-root', `OlorinPageSimple-scroll-${scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				<div className="z-10 flex h-full flex-auto flex-col">
					<div className="OlorinPageSimple-wrapper">
						{leftSidebarContent && (
							<OlorinPageSimpleSidebar
								position="left"
								variant={leftSidebarVariant || 'permanent'}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</OlorinPageSimpleSidebar>
						)}
						<div
							className="OlorinPageSimple-contentWrapper"

							// enable={scroll === 'page'}
						>
							{header && <OlorinPageSimpleHeader header={header} />}

							{content && (
								<OlorinScrollbars
									enable={scroll === 'content'}
									className={clsx('OlorinPageSimple-content container')}
								>
									{content}
								</OlorinScrollbars>
							)}
						</div>
						{rightSidebarContent && (
							<OlorinPageSimpleSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</OlorinPageSimpleSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
});

export default memo(styled(OlorinPageSimple)``);
