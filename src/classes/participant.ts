export class ParticipantClass {

  constructor(

		public name: string = 'Name',
		public surname: string = 'Surname',
		public patronimic: string = 'Patronimic', 

		public phone: string = '', 

		public deposited: number = 0, 
		public expected: number = 0, 
		public left: number = 0

	) {}

}

