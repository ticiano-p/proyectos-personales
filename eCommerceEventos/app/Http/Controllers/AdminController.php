<?php

namespace App\Http\Controllers;
use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\OrderItem;

class AdminController extends Controller
{
    public function index()
{
    $admins = Blog::paginate(6, ['*'], 'blogs_page');
    $user = User::paginate(5, ['*'], 'users_page');

    // producto mas comprado             Selecciona el producto y suma total de cantidades vendidos
     $productoMasComprado = OrderItem::selectRaw('product_id, SUM(quantity) as total_vendidos')
    ->groupBy('product_id')
    ->orderByDesc('total_vendidos')
    ->with('product') // trae el nombre del producto
    ->first();


    return view('admin.index', [
        'admins' => $admins,
        'user' => $user,
        'productoMasComprado' => $productoMasComprado,
    ]);
    
}

    public function create()
    {
        return view('admin.create',[
            'category'=> Category::orderBy('name')->get()
        ]);
    }
    
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|min:2',
        'resumen' => 'required',
        'contenido' => 'required',
        'category_id' => 'required|array|min:1',
    ], [
        'title.required' => 'El titulo debe tener un valor',
        'title.min' => 'El titulo debe tener al menos :min caracteres',
        'resumen.required' => 'Tienes que colocar un resumen al Articulo',
        'contenido.required' => 'El Articulo no puede quedar vacío',
        'category_id.required' => 'Debes seleccionar al menos una categoría.',
        'category_id.min' => 'Selecciona al menos una categoría.',

    ]);

    $input = $request->all();
    
    $Blog = new Blog;
    $Blog->titulo = $input['title'];
    $Blog->resumen = $input['resumen'];
    $Blog->contenido = $input['contenido'];
    $Blog->fecha_publicacion = now();
    $Blog->cover = $input['cover'] ?? null;
    $Blog->cover_description = $input['cover_description'] ?? null;
      if ($request->hasFile('cover')) {
        $path = $request->file('cover')->store('covers', 'public');
        $Blog->cover = $path;
    }
    $Blog->save();

$categoryIds = $request->input('category_id', []);
if (!empty($categoryIds)) {
    $Blog->category()->attach($categoryIds);
}

    return redirect()
        ->route('admin.index')
        ->with('feedback.message', 'El Articulo <b>' . $input['title'] . '</b> ha sido creado y publicado.');
}

    public function view( Blog $blog)
    {       
        return view('admin.view', [
            'Blog'=> $blog
        ]);
    }
    public function eliminar(Blog $blog)
    {
        return view('admin.eliminar',[
              'blog'=> $blog
        ]);
    }
    
    public function destroy(Blog $blog)
    {
        $input = $blog;
        $input->category()->detach();
        $input->delete();
        
      if ($input->cover ) {
            Storage::disk('public')->delete($input->cover);
        }
        return redirect()
        ->route('admin.index')
        ->with('feedback.message', 'El Articulo <b>'. ($input['titulo']) .'</b> se elimino exitosamente.');
    }
    
    public function edit(Blog $blog)
    {
        return view('admin.edit',[
              'blog'=> $blog,
             'category'=> Category::orderBy('name')->get()

        ]);
    }
    public function update(Request $request, Blog $blog)
{
    $request->validate([
        'title' => 'required|min:2',
        'resumen' => 'required',
        'contenido' => 'required',
        'category_id' => 'required|array|min:1',
    ]);

    $Blog = $blog;

    $Blog->titulo = $request->input('title');
    $Blog->resumen = $request->input('resumen');
    $Blog->contenido = $request->input('contenido');
    $Blog->fecha_publicacion = now();

    $oldCover = $Blog->cover;

    if ($request->hasFile('cover')) {
        $path = $request->file('cover')->store('covers', 'public');
        $Blog->cover = $path;
    }
    if ($oldCover && Storage::disk('public')->exists($oldCover)) {
            Storage::disk('public')->delete($oldCover);
        }

    $Blog->cover_description = $request->input('cover_description');
    $Blog->save();

    $Blog->category()->sync($request->input('category_id'));

    return redirect()
        ->route('admin.index')
        ->with('feedback.message', 'El artículo <b>' . $Blog->titulo . '</b> ha sido actualizado.');
}
public function historial($userId)
{
    $user = User::with('orders.items.product')->findOrFail($userId);

    return view('admin.historial', [
        'user' => $user
    ]);
}



}