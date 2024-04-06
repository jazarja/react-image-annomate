/* eslint-disable */
import DrawingBoard from '../components/DrawingBoard';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof DrawingBoard> = {
    title: 'UI/DrawingBoard',
    component: DrawingBoard,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DrawingBoard>;

export const MainView: Story = {
    args: {

    },
};


