import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class TaskService {
private apiUrl = 'http://localhost:3000/api/tareas';

constructor(private http: HttpClient) { }

private getHeaders(userId: string, role: string) {
return new HttpHeaders({
'x-user-id': userId,
'x-user-role': role
});
}

getTasks(userId: string, role: string): Observable<any> {
const headers = this.getHeaders(userId, role);
return this.http.get(this.apiUrl, { headers });
}

createTask(task: any, userId: string, role: string): Observable<any> {
const headers = this.getHeaders(userId, role);
return this.http.post(this.apiUrl, task, { headers });
}

deleteTask(id: number, userId: string, role: string): Observable<any> {
const headers = this.getHeaders(userId, role);
return this.http.delete(this.apiUrl + '/' + id, { headers });
}

updateTask(id: number, task: any, userId: string, role: string): Observable<any> {
const headers = this.getHeaders(userId, role);
return this.http.put(this.apiUrl + '/' + id, task, { headers });
}
}
