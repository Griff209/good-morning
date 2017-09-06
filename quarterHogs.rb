require 'sinatra'

get '/'do
  html :today
end

#handle our XML call to the data directory and return the file
get '/data/*.*' do |name, ext|
  File.read(File.join('data', "#{name}.#{ext}"))
end


def html(view)
  File.read(File.join('views', "#{view.to_s}.html"))
end
