module NavigationHelpers
  module Refinery
    module Highlights
      def path_to(page_name)
        case page_name
        when /the list of highlights/
          admin_highlights_path

         when /the new highlight form/
          new_admin_highlight_path
        else
          nil
        end
      end
    end
  end
end
