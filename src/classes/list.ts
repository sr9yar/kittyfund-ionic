export class ListClass {
	
  constructor(

    public id: number = 0,
	public creator_id: string = '',
    public active: boolean = true,
    public name: string = 'New list',
    public people: Array<any>
	) {}

}
