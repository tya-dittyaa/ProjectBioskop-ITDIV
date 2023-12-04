export interface Theater {
  id: string;
  name: string;
  location: string;
}

export interface Studio {
  id: string;
  theaterId: string;
  roomNumber: number;
  capacity: number;
}
