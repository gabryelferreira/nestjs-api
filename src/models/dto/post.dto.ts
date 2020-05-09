import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {
    @IsNotEmpty()
    text: string;

}