Jekyll::Hooks.register :site, :post_write do |site|
  system('tailwindcss -i ./_sass/_base.scss -o ./assets/css/index.css --minify')
end
