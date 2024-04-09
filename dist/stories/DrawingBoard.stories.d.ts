import DrawingBoard from '../components/DrawingBoard';
import { Meta, StoryObj } from "@storybook/react";
declare const meta: Meta<typeof DrawingBoard>;
export default meta;
type Story = StoryObj<typeof DrawingBoard>;
export declare const UploadImage: Story;
export declare const LoadFromBase64: Story;
