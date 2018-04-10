export class FundClass {

  constructor(

	public id: number = 0,
	public creator_id: string = '',
	public active: boolean = true,
	public name: string = 'New fund',

	public goal: number = 0,
	public expected: number = 0,
	public left: number = 0,
	public deposited: number = 0,
	public spent: number = 0,
	public available: number = 0,

    public people: Array<any>,
	public expenses: Array<any>

	) {}

}
