# Routing

## Table of Contents  
* [Introduction](#Introduction)<br>
* [Creating and Registering The Route](#Creating-and-Registering-The-Route)<br>
* [Providing Tab Navigation](#Providing-Tab-Navigation)<br>
* [Programmatically Navigate](#Programmatically-Navigate)<br>
* [Dynamic Section in Route](#Dynamic-Section-in-Route)<br>
* [Passing Query Parameters and Fragments Non Programmatically](#Passing-Query-Parameters-and-Fragments-Non-Programmatically)<br>
* [Adding Query Parameters Programmatically](#Adding-Query-Parameters-Programmatically)<br>
* [Retrieving Query Parameters in Typescript File](#Retrieving-Query-Parameters-in-Typescript-File)<br>
* [Child Routing or Nested Routing](#Child-Routing-or-Nested-Routing)<br>
* [Wildcard Routing](#Wildcard-Routing)<br>

## Introduction

1. Routing allow us to navigate between different components in view
2. Eg. navigate between home, authentication, and other tab
3. Technically we are on the same page of the application, and angular render the different components according to the given component locations
4. Browser does not reload the entire app while navigating across different component, because on browser level, only index.html page is loaded

## Creating and Registering The Route

1. Sample component used in this tutorial

   1. Component 1: Home
   2. Component 2: Servers
   3. Component 3: Users

2. Create ```app-routing.module.ts``` this file will hold all the routing related logic

   ~~~typescript
   //app-routing.module.ts
   const appRoutes: Routes = [
   	// key value pair of path and component will come here
   ]
   
   @NgModule({
       imports: [
           RouterModule.forRoot(appRoutes,{useHash: true})
       ], 
       exports :[RouterModule]
   })
   export class AppRoutingModule{
   }
   ~~~

3. Import ```app-routing.module.ts``` in ```app.module.ts```

   ~~~typescript
   @NgModule({
       imports: [ AppRoutingModule ]
   })
   export class AppModule { }
   ~~~

4. Add Provide path of the component in ```app-routing.module.ts```

   ~~~typescript
   //app-routing.module.ts
   const appRoutes: Routes = [
   	    {path:'', component: HomeComponent},
       	{path:'users', component: UsersComponent},
       	{path:'server', component: ServersComponent}
   ]
   // associating the paths with the respective components
   // empty path will render the HomeComponent
   ~~~

5. Add outlet for router in ```app.component.ts``` 

   ~~~html
   <div>
       <router-outlet>
           here all the components will be render
           according to the provided path
       </router-outlet>
   </div>
   ~~~

## Providing Tab Navigation

1. Above implemented routes will be reachable only by URL so far

2. By providing tabs, user can navigate among components by clicking the respective tab 

3. Replace ```href``` with ```routerlink```

   ~~~html
   <!--app.component.html-->
   <!--before routerlink implementation-->
   <a href = ""> Home </a>
   <a href = "/users"> Users </a>
   <a href = "/server"> Servers </a>
   <!--disadvantage of href: it reloads the entire app upon clicking the navigation link-->
   ~~~

   ~~~html
   <!--app.component.html-->
   <!--after routerlink implementation-->
   <a routerLink = "/"> Home </a>
    <a routerLink = "/servers"> Servers </a>
   <a [routerLink] = "['/users']"> Users </a>	<!--different method-->
   <!--it leverages the angular routing : does not reload the application upon navigation-->
   ~~~

4. Absolute path being used when giving path of component which directly located under root component

5. Relative path being used when giving the path of component which is child of some other component

6. Show active tab, whose router link is loaded

   ~~~html
   <ul class="nav nav-tabs">
       <li role="presentation" 
       	routerLinkActive = "active"
       	[routerLinkActiveOptions] = "{exact:true}">
          		<a routerLink = "/">Home</a>
   	</li>
   
   	<li role="presentation" 
       	routerLinkActive = "active">
          		<a routerLink = "/servers">Servers</a>
   	</li>
   
   	<li role="presentation" 
           routerLinkActive = "active">
          		<a [routerLink] = "['/users']">Users</a>
   	</li>
   </ul>
   ~~~

## Programmatically Navigate

1. Create a button, by clicking this button user should navigate to the ```ServersComponent```

   ~~~html
   <!--app.component.html-->
   <button (click) = "onGoToServers()">
       Click me to go to Servers
   </button>
   ~~~

   ~~~typescript
   // app.component.ts
   export class AppComponent {
       constructor(private route:Route){}
       
       onGoToServers(){
           this.route.navigate(['/server']);
       }
   }
   ~~~

## Dynamic Section in Route

1. User can also add the dynamic section in the router URL

2. In simple term user can pass the variable value along with the router link

3. Pass the variable ```id``` with the router link ```user```

4. Upon above described URL request ```UserComponent``` should be loaded and ```id``` should be available at the ```UserComponent ``` and variable ```id``` should be accessible in ```UserComponent```

5. Register the path in ```app-routing.module.ts```

   ~~~typescript
   const appRoutes: Routes = [
       {path: 'users/:id', component:UserComponent}
   ]
   
   // :id => is the dynamic parameter 
   // sample URL with id : users/2, where 2 is the value of id
   // this url will navigate us to the UserComponent
   ~~~

6. Accessing the ```id``` in ```UserComponent```

   ~~~typescript
   //user.component.ts
   export class UserComponent implements OnInit {
       userId;
       
       constructor (private route : ActivatedRoute){}
       
       ngOnInit(){
           this.userId = this.route.snapshot.param['id'];
       }
   }
   ~~~

7. Updating a component from inside the component.html

   ~~~html
   <!--user.component.html-->
   <a [routerLink]="['/users',10,'User1']">
       Load User1
   </a>
   ~~~

   ~~~typescript
   //user.component.ts
   ngOnInit(){
       constructor (private route : ActivatedRoute){}
       
       this.route.params.Subscribe(
       (param:params)=> {
           this.user.id = param['id'];
       	}
       )
   }
   ~~~

8. When component destroyed Angular automatically destroy the subscription internally

9. Which is not the case of customized observables, in case of customized observable it is necessary to unsubscribe the subscription upon component destruction

10. This can be achieve by calling ```unsubscribe``` method in ngDestroy life cycle hook of the component

## Passing Query Parameters and Fragments Non Programmatically

1. Query parameters starts with ```?``` and multiple queries are separated by ```&``` sign

2. Example query: ```?mode=editing&?server=fixed```

3. Accessing the different parameters of router link

   ~~~html
   <!--server.component.html-->
   <a 
      [routerLink] = "['/servers',4,'edit']"
      [queryParams] = "{allowEdit:1}"
      fragment = "Loading">
   </a>
   
   <!--resulting URL-->
   servers/4/edit?allowEdit=1#Loading
   and this url request will bring us to the ServersComponent
   ~~~

## Adding Query Parameters Programmatically

~~~html
<!--home.component.html-->
<button
 (click)  = onLoadServer(1)>
    Load Server 1
</button>
~~~

~~~typescript
//home.component.ts
onLoadServer(id:number){
    this.route.navigate(['/server', id, 'edit'],
                        {queryParams:{allowEdit:1},fragment:'Loading'})
}
~~~

## Retrieving Query Parameters in Typescript File

~~~typescript
// target component on which route is set : edit-server.component.ts

// add activatedRoute dependency in constructor
constructor(private route:ActivatedRoute){}

// accessing query parameter and fragment using snapshot
ngOnInit(){
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
}
// snapshot will not reflect the new updates, because it passes the copy of changes
// it is necessary to subscribe to the route if you need updates on the route
~~~

~~~typescript
// update query params from inside the page 
ngOnInit(){
    this.route.queryParams.subscribe(
    queryParams =>{
        console.log(queryParams);
    	}
    );
    
    this.route.fragment.subscribe(
    fragment => {
        console.log(fragment);
    }
    );
}
~~~

## Child Routing or Nested Routing

1.  conventional way of declaring the child component using path

   ~~~typescript
   {path:'servers', component:ServersComponent}
   {path:'servers/:id', component:ServersComponent}
   {path:'servers/:id/edit', component:EditServersComponent}
   ~~~

2. More structured way

   ~~~typescript
   // add childeren paths in server path
   const appRoutes: Routes = [ 
   	 {path:'servers', component:ServersComponent, 
        		children: [
               	{path: ':id', component: ServerComponent},
                   {path: ':id/edit' component: EditServerComponent}
           	]
        }
   ]
   ~~~

## Wildcard Routing

1. If requested router path does not covered by any component, then application will crash

2. In such case wildcard routing comes in handy

3. Create a component named ```PageNotFound``` 

4. Add routing path of this component in to ```app.routing.module.ts```

5. This component will be loaded when non of the path matches to the requested path by user

   ~~~typescript
   {path:'**', component:PageNotFound}
   // add this path at the end of path list 
   ~~~

