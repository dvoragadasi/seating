import { Component, OnInit } from '@angular/core';
import { NewDbService } from '../db.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

const INIT_ROWS = 10;
const INIT_SEATS = 20;

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.sass']
})
export class NewRoomComponent implements OnInit {
  roomConfig;
  constructor(private db: NewDbService, private router: Router) {
    this.roomConfig = new FormGroup({
      id: new FormControl(),
      roomName: new FormControl('', Validators.required),
      rowCount: new FormControl(INIT_ROWS, [Validators.required, Validators.min(1)]),
      avgSeatsInRow: new FormControl(INIT_SEATS, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {

  }

  save() {
    this.db.saveRoomConfig(this.roomConfig.value)
      .subscribe(id => {
        console.log('room saved, id:', id);
        this.router.navigate(['/room-config', id]);
      });

    }
  }
