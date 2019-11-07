import { IsNotEmpty, IsEmail, IsLowercase } from "class-validator";

export class UserDTO{
    
    user_name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsLowercase()
    user_email: string;

    @IsNotEmpty()
    user_password: string;
    
    user_extras: JSON;

    user_active: boolean;
}

export class UserRO{
    user_id: Date;
    user_name: string;
    user_email: string;
    user_extras: JSON;
    user_active: boolean;
    created_at: Date;
    token?: string;
}