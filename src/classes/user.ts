export class UserClass {

  constructor(

	public login: string = '',
	public creator_id: string = '',
	public active: boolean = true,

	public name: string = 'Name',
	public surname: string = 'Surname',
	public patronimic: string = 'Patronimic', 
	public phone: string = '', 
	public role: string = 'user', 
	public email: string = '', 
	public vk_id: string = '' 

	) {}

}