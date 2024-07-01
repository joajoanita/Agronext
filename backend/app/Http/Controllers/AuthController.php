<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    /*
        El 'auth api' middleware es usado sin una clase objeto, las
        funciones dentro de el controlador de autentificaón no 
        podrán ser accesibles sin tener un token válido.
        Además, podemos excluir (como login o register) para
        quitarlos de necesitan un token obligatorio.
    */
  
     public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /*
        Este método nos permite acceder con el usuario
        y es llamado cuando la API /api/auth/login lo llama.
        Autentica el email y la contraseña cuando es metida por 
        un usuario en ambos campos. En respuesta, crea un token de
        autorización para ver si encuentra ese usuario metido en la
        base de datos. Viceversa si no lo encuentra.
    */

     public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /*
        El método de registro es usado para crear un nuevo
        usuario cuando la ruta api/auth/register lo llame. Primero
        el usuario es evaluado como un nombre, email y contraseña
        que luego es validado a través del proceso de validación
        y el usuario se creará si esos credenciales son válidos.
        Luego, generará el json web un token para darle un 
        acceso válido al usuario.
    */
   
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /*
        El método logout es llamado cuando el API /api/auth/logout lo llama, 
        y limpiará el token de acceso JWT que estuviera.    
    */ 
   

     public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /*
        Este método crea un nuevo token JSON en un corto periodo 
        de tiempo y es considerado la mejor práctica para generar 
        un nuevo token por en el sistema de autenticación de laravel, 
        siendo el más seguro. Te invalida el usuario que está logued 
        en eses momento si el token JWT no es nuevo.
    */

 

     public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    
    /*
        Este método renderiza los datos del usuario que ha iniciado
        sesión. Funciona cuando le ponemos el token de autentificación
        en los headers de autentificación cuando le hacemos un 
        request desde /api/auth/user-profile API.
    */
 
    public function userProfile() {
        return response()->json(auth()->user());
    }

    /* 
        Esta función crea un nuevo token de autentificación 
        JWT después de un periodo de tiempo específico, 
        nosotros hemos definido la expiración del token y 
        los datos del usuario que ha iniciado sesión en esta función.    
    */
   
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}

