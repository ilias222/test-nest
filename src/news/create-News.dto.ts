import { IsNumberString, IsNotEmpty, IsString, IsDateString, IsObject, ValidateIf } from "class-validator"; 

export class FindOneParams {
    @IsNumberString()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    descript: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsDateString()
    @IsNotEmpty()
    dataMess: Date;

    @IsNumberString()
    @IsNotEmpty()
    authorid: number;

    @IsNumberString()
    @IsNotEmpty()
    categoryid: number;

    @ValidateIf((o) => o.imgTitle)
    @IsObject()
    imgTitle: object;

    @ValidateIf((o) => o.text)
    @IsString()
    text: string;
}