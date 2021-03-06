import { chunk, has } from 'lodash';

import {
	BaseControl,
	Button,
	Icon,
	Flex,
	FlexItem,
	Modal,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function IconsPicker(props) {
	const { label, icons, value, onChange } = props;
	const [isOpened, setIsOpened] = useState(false);
	const [selected, setSelected] = useState(value);

	if (!icons.length) {
		return null;
	}

	return (
		<BaseControl>
			<legend>
				<BaseControl.VisualLabel>{label}</BaseControl.VisualLabel>
			</legend>
			<Flex justify="flex-start">
				<FlexItem>
					<Button
						isTertiary
						isPressed={isOpened}
						onClick={() => {
							setIsOpened(!isOpened);
						}}
					>
						{!value
							? __('Add', 'innocode-components')
							: __('Update', 'innocode-components')}
					</Button>
				</FlexItem>
				{!!value && (
					<FlexItem>
						<Button
							isDestructive
							onClick={() => {
								onChange();
							}}
						>
							{__('Remove', 'innocode-components')}
						</Button>
					</FlexItem>
				)}
			</Flex>
			{isOpened && (
				<Modal
					title={label}
					onRequestClose={() => {
						setIsOpened(false);
					}}
				>
					{chunk(icons, 5).map((line) => (
						<Flex
							key={line.map((icon) => icon.value).join('|')}
							justify="flex-start"
						>
							{line.map((icon) => (
								<FlexItem
									key={icon.value}
									style={{
										marginBottom: 8,
									}}
								>
									<Button
										isPressed={icon.value === selected}
										onClick={() => {
											setSelected(
												icon.value !== selected
													? icon.value
													: undefined
											);
										}}
									>
										<Icon
											icon={
												has(icon, 'icon')
													? icon.icon
													: icon.value
											}
										/>
									</Button>
								</FlexItem>
							))}
						</Flex>
					))}
					<Flex justify="flex-end">
						<FlexItem>
							<Button
								isPrimary
								variant="primary"
								onClick={() => {
									onChange(selected);
									setIsOpened(false);
								}}
							>
								{__(
									'Set Icon',
									'innocode-component-icons-picker'
								)}
							</Button>
						</FlexItem>
					</Flex>
				</Modal>
			)}
		</BaseControl>
	);
}
